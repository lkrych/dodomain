require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do
  #helper method for decoding JWT
  def decodeResponseJWT(response)
    token = json(response)['auth_token']
    return JsonWebToken.decode(token)
  end

  before :each do  
    @u = FactoryBot.create(:user)
  end
  
  context 'Logging in' do

    context 'Valid credentials' do

      it 'should return a valid JWT ' do
        post :get_token, params: { :user => {:email => "firstuser@gmail.com",
                    :password => 'password'}}

        expect(response.status).to be(200)
        expect(response.content_type).to eq "application/json"
        
        returnedJSON = json(response)
        expect(returnedJSON).to have_key("auth_token")
        expect(decodeResponseJWT(response)['user_id']).to eq(@u.id)
      end
      
    end

    context 'Invalid credentials' do
      it 'should indicate that an account doesnt exist if no one has signed up with that email' do
        post :get_token, params: { :user => {:email => 'random@example.com',
                    :password => 'password'}}

        expect(response.status).to be(401)
        expect(response.content_type).to eq "application/json"
        expect(json(response)['session_errors']).to include('There is no account associated with this email')
      end

      it 'should indicate that password is incorrect if inputted password doesnt match password_digest on file ' do
        post :get_token, params: {:user => {:email => "firstuser@gmail.com",
                    :password => 'nottherightpassword'}}

        expect(response.status).to be(401)
        expect(response.content_type).to eq "application/json"
        expect(json(response)['session_errors']).to include('Incorrect Password')
      end

    end    
  end

  context 'Signing up' do
    it "should complete the sign up process and return a token for a user" do
      post :sign_up, params: {:user => {email: "validemail@gmail.com", password: "validpassword"}}
      expect(response.status).to eq(200)
      returnedJSON = json(response)
      expect(returnedJSON).to have_key("auth_token")
      decoded = decodeResponseJWT(response)
      expect(User.count).to eq(2)
    end

    it "should return an error the user has already signed up" do
      post :sign_up, params: {:user => {email: @u.email, password: @u.password}}
      expect(response.status).to eq(401)
      expect(json(response)['session_errors']).to eq("An account has already been created with this email")
    end

  end

  context 'Logging out' do
    
    it 'should return an empty token' do
      token = get_valid_token()
      request.headers.merge! build_headers(token)
      delete :sign_out

      expect(response.status).to be(200)
      expect(response.content_type).to eq "application/json"
      expect(json(response)).to have_key("auth_token")
      expect(json(response)['auth_token']).to be_empty
    end
    
  end
end
