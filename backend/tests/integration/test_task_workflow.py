import pytest

@pytest.mark.django_db
def test_task_lifecycle(api_client, create_user):
    user = create_user(username='bob')
    # Login
    login_resp = api_client.post('/api/v1/auth/login/', {'username': 'bob', 'password': 'testpass123'}, format='json')
    token = login_resp.data['access']
    api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)

    # List (empty)
    list_resp = api_client.get('/api/v1/tasks/')
    assert list_resp.status_code == 200
    assert list_resp.data['count'] == 0

    # Create (checkout)
    task_data = {"title": "The Great Gatsby", "description": "Classic novel", "completed": False}
    create_resp = api_client.post('/api/v1/tasks/', task_data, format='json')
    assert create_resp.status_code == 201
    task_id = create_resp.data['id']

    # Update (return)
    update_payload = {"title": "The Great Gatsby", "description": "Classic novel", "completed": True}
    update_resp = api_client.put(f'/api/v1/tasks/{task_id}/', update_payload, format='json')
    assert update_resp.status_code == 200
    assert update_resp.data['completed'] is True

    # Delete (cancel reservation)
    del_resp = api_client.delete(f'/api/v1/tasks/{task_id}/')
    assert del_resp.status_code == 204
