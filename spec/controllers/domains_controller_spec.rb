require 'rails_helper'

RSpec.describe DomainsController, type: :controller do

  context "#index and user validations" do
    context 'as a valid user' do
      it 'should return a domain with the proper fields!' do
        FactoryBot.create(:domain)
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, params: {:domain => {order_by: "created_at"}}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)).to include('domains', 'pagination')
        expect(json(response)['domains'].first).to include('name', 'description', 'created_at')
        expect(json(response)['domains'].first['name']).to eq("mydomain.com")
      end

    end

    context 'as a nefarious user hitting our api' do
      it 'should return Not Authenticated' do
        get :index, params: {:domain => {order_by: ""}}, :format => 'json'
        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
      end
    end

    context 'as a nefarious user who manipulates their JWT' do
      it 'should return as Not Authenticated' do  
        FactoryBot.create(:user)      
        token = get_valid_token()
        decoded = JsonWebToken.decode(token)
        decoded['user_id'] = 4
        tampered = JsonWebToken.encode(decoded, "not_our_secret_key")
        request.headers.merge! build_headers(tampered)
        get :index, params: {:domain => {order_by: ""}}, :format => 'json'

        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
      end
    end

    context 'verifying that the application can recover from JWT errors' do
      before (:each) do
        FactoryBot.create(:user)      
      end
      it 'should return as Not Authenticated if VerificationError is raised' do
        allow(JsonWebToken).to receive(:decode).and_raise(JWT::VerificationError)
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, params: {:domain => {order_by: ""}}, :format => 'json'

        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
      end

      it 'should return as Not Authenticated if DecodeError is raised' do
        allow(JsonWebToken).to receive(:decode).and_raise(JWT::DecodeError)
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, params: {:domain => {order_by: ""}}, :format => 'json'

        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
      end

      it 'should return as Not Authenticated if ExpiredSignature is raised' do
        allow(JsonWebToken).to receive(:decode).and_raise(JWT::ExpiredSignature)
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, params: {:domain => {order_by: ""}}, :format => 'json'

        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
      end
    end

    context 'with multiple domains using sorting options' do
      before(:each) do
        u1 = FactoryBot.create(:user)
        u2 = FactoryBot.create(:user, email: "anothervalidemail@yahoo.com")
        (1...100).each do |idx|
          Domain.create(
            name: "domain#{idx}", 
            description: "description for domain#{idx}", 
            user_id: idx.odd? ? u1.id : u2.id )
        end
      end

      it "should return the correct number of domains and default to sorting by created_at" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, params: {blah:""}, :format => 'json'
        json = json(response)
        expect(response.status).to be(200)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['name']).to eq('domain99')
        sorted = json['domains'].sort {|b, a| a['id'] <=> b['id']}
        expect(json['domains']).to eq(sorted)
      end

      it "should return the domains in reverse order if desc param is passed" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {desc: false}, :format => 'json'
        json = json(response)        
        expect(response.status).to be(200)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['name']).to eq('domain1')
        sorted = json['domains'].sort {|a, b| a['id'] <=> b['id']}
        expect(json['domains']).to eq(sorted)
      end

      it "should change the page if the page param is passed" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {page: 3}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)).to include('domains', 'pagination')
        expect(json(response)['domains'].length).to eq(0)
        expect(json(response)['pagination']['page']).to eq('3')
      end


      it "should only return the searched for domain if search_query param is used" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {search_query: 'domain26'}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)).to include('domains', 'pagination')
        expect(json(response)['domains'].length).to eq(1)
        expect(json(response)['domains'].first['name']).to eq('domain26')
      end

      it "should return the domains sorted by order_by param: name " do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {order_by: 'name'}, :format => 'json'
        expect(response.status).to be(200)
        json = json(response)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['name']).to eq('domain99')
        sorted = json['domains'].sort {|b, a| a['name'] <=> b['name']}
        expect(json['domains']).to eq(sorted)
      end


      it "should return the domains sorted by order_by param: name in reverse order if desc param is used " do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {order_by: 'name', desc: false}, :format => 'json'
        expect(response.status).to be(200)
        json = json(response)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['name']).to eq('domain1')
        sorted = json['domains'].sort {|a, b| a['name'] <=> b['name']}
        expect(json['domains']).to eq(sorted)
      end

      it "should return the domains sorted by order_by param: description " do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {order_by: 'description'}, :format => 'json'
        expect(response.status).to be(200)
        json = json(response)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['description']).to eq("description for domain99")
        sorted = json['domains'].sort {|b, a| a['description'] <=> b['description']}
        expect(json['domains']).to eq(sorted)
      end

      it "should return the domains sorted by order_by param: description in reverse order if desc param is used " do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {order_by: 'description', desc: false}, :format => 'json'
        json = json(response)
        expect(response.status).to be(200)
        expect(json).to include('domains', 'pagination')
        expect(json['domains'].length).to eq(50)
        expect(json['domains'].first['description']).to eq("description for domain1")
        sorted = json['domains'].sort {|a, b| a['description'] <=> b['description']}
        expect(json['domains']).to eq(sorted)
      end

      it "should throw an error if bogus order_by params are fed to it" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params =>  {order_by: 'baby beluga', desc: false}, :format => 'json'
        expect(response.status).to be(400)
        expect(json(response)['domain_errors']).to eq('An error occurred retrieving your data.')       
        
      end
  
      
      it "should default to normal sorting if bogus desc params are fed to it" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params => {desc: 'baby beluga'}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)['domains'].length).to eq(50)
        expect(json(response)['domains'].first['name']).to eq('domain99')
        
      end 

      it "should not return domains if bogus query params are fed to it" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params =>  {search_query: 'baby beluga', desc: false}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)['domains'].length).to eq(0)
        
      end
      
      it "should throw an error if bogus page params are fed to it" do
        
        token = get_valid_token()
        request.headers.merge! build_headers(token)
        get :index, :params =>  {page: 'baby beluga', desc: false}, :format => 'json'
        expect(response.status).to be(400)
        expect(json(response)['domain_errors']).to eq('An error occurred retrieving your data.')               
        
      end 
    end
  end

  context "#create and user validations" do
    before(:each) do
      FactoryBot.create(:user)
    end
    context 'as a valid user' do
      it 'should return a success message!' do
        token = get_valid_token()
        request.headers.merge! build_headers(token)

        get :create, params: {:domain => {name: "https://www.google.com", description: "a glorious new domain"}}, :format => 'json'
        expect(response.status).to be(200)
        expect(json(response)).to include('message')
        expect(json(response)['message']).to eq("Domain successfully saved!")
        expect(Domain.count).to eq(1)
      end

      context 'with valid urls' do

        it 'should strip all url elements from submission' do
          url_hash = { 
            "https://www.opendns.com/about": "opendns.com",
            "http://www.belugawhale.com/songs/about": "belugawhale.com",
            "https://www.google.co.uk": "google.co.uk"
              }

          token = get_valid_token()
          request.headers.merge! build_headers(token)

          url_hash.each do |k, v|
            get :create, params: {:domain => {name: k, description: "some filler description"}}, :format => 'json'
            expect(response.status).to be(200)
            expect(json(response)).to include('message')
            expect(json(response)['message']).to eq("Domain successfully saved!")
            expect(Domain.last.name).to eq(v)
          end
          expect(Domain.count).to eq(3) 
        end

      end

      context 'with invalid urls' do

        it 'should reject invalid domain submissions' do
          token = get_valid_token()
          request.headers.merge! build_headers(token)
          ["invalidinvalidicky.domaincom", "somethingor.snothera.ocm"].each do |bad_url|
            get :create, params: {:domain => {name: bad_url, description: "some filler description"}}, :format => 'json'
            expect(response.status).to be(400)
            expect(json(response)).to include('domain_errors')
            expect(json(response)['domain_errors']).to match("An error occurred saving your domain")
            expect(Domain.count).to eq(0)
          end
        end
      end

    end

    context 'as a nefarious user hitting our api' do
      it 'should return a 404 html page' do
        get :create, params: {:domain => {name: "newDomain!", description: "a glorious new domain"}}, :format => 'json'
        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
        expect(Domain.count).to eq(0)
      end
    end

    context 'as a nefarious user who manipulates their JWT' do
      it 'should return as Not Authenticated' do  
        token = get_valid_token()
        decoded = JsonWebToken.decode(token)
        decoded['user_id'] = 4
        tampered = JsonWebToken.encode(decoded, "not_our_secret_key")
        request.headers.merge! build_headers(tampered)
        get :create, params: {:domain => {name: "newDomain!", description: "a glorious new domain"}}, :format => 'json'

        expect(response.status).to be(401)
        expect(json(response)['session_errors']).to include('Not Authenticated')
        expect(Domain.count).to eq(0)
      end
    end
  end

end
