import pytest

@pytest.mark.django_db
def test_registration_login_flow(api_client):
    # Register
    register_url = '/api/v1/auth/register/'
    payload = {
        "username": "alice",
        "email": "alice@example.com",
        "password": "Secret123!",
        "first_name": "Alice",
        "last_name": "Smith"
    }
    reg_resp = api_client.post(register_url, payload, format='json')
    assert reg_resp.status_code == 201

    # Login
    login_url = '/api/v1/auth/login/'
    login_resp = api_client.post(login_url, {"username": "alice", "password": "Secret123!"}, format='json')
    assert login_resp.status_code == 200
    token = login_resp.data['access']

    # Authenticated request
    me_url = '/api/v1/users/me/'
    api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
    me_resp = api_client.get(me_url)
    assert me_resp.status_code == 200
    assert me_resp.data['username'] == 'alice'
