require 'rails_helper'

RSpec.describe AuthenticationController, type: :controller do
  def decodeResponseJWT(response)
    token = json(response)['auth_token']
    return JsonWebToken.decode(token)
  end
  
  context 'Logging in' do
    context 'Valid credentials' do

      it 'should return a valid JWT ' do
        u = FactoryBot.create(:user)
        post :get_token, params: {:email => "firstuser@gmail.com",
                    :password => 'password'}

        expect(response.status).to be(200)
        expect(response.content_type).to eq "application/json"
        
        returnedJSON = json(response)
        expect(returnedJSON).to have_key("auth_token")
        expect(decodeResponseJWT(response)['user_id']).to eq(u.id)
      end
    end

    context 'Invalid credentials' do
      it 'should indicate that username is incorrect if it doesnt exist' do
        post :api_v1_auth, params: {:email => 'random@example.com',
                    :password => 'password'}

        expect(response.status).to be(401)
        expect(response.content_type).to eq "application/json"
        expect(json(response)['errors']).to include('Incorrect Email')
      end

      it 'should indicate that password is incorrect if username exists' do
        FactoryBot.create(:user)        
        post :api_v1_auth, params: {:email => 'user@example.com',
                    :password => 'nottherightpassword'}

        expect(response.status).to be(401)
        expect(response.content_type).to eq "application/json"
        expect(json(response)['errors']).to include('Incorrect Password')
      end

    end    
  end

  context 'Signing up' do
    it "should complete the sign up process and return a token for a user" do
      u = FactoryBot.create(:user)
      post :sign_up, params: {email: u.email, password: u.password}
      expect(response.status).to eq(200)
      returnedJSON = json(response)
      expect(returnedJSON).to have_key("auth_token")
      decoded = decodeResponseJWT(response)
      expect(decoded['user_id']).to eq(u.id)
    end

    it "should return an error the user has already signed up" do
      u = FactoryBot.create(:user)
      post :sign_up, params: {email: u.email, password: u.password}
      expect(response.status).to eq(401)
      expect(json(response)['errors']).to eq(["This account has already signed up."])
    end

    it "should return an error if the email is not found for a user" do
      u = FactoryBot.create(:user)
      post :sign_up, params: {email: "missing@oops.com", password: user.password, name: user.name}
      expect(response.status).to eq(401)
      expect(json(response)['errors']).to eq(["Incorrect Email"])
    end

  end

  context 'Logging out' do
    
    it 'should return an empty token' do
      FactoryBot.create(:user)
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
