from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase, \
    CoreAPIClient
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ToDoModelViewSet
from .models import Project, ToDo, User


# Create your tests here.


class UserModelViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.data = {'first_name': 'Andrey', 'last_name': 'Larionov', 'username': 'AndreyL',
                     'email': 'anlar@gmail.com'}

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/todo/')
        view = ToDoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProjectModelViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/todo/'
        self.name = 'admin'
        self.password = 'adminpass'
        self.admin = User.objects.create_superuser(self.name, 'admin@mail.ru', self.password)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project(self):
        self.client.login(username=self.name, password=self.password)
        response = self.client.post(f'/api/projects/', {'name': 'Test project', 'repo_url': '', 'user': [1]})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_edit_todo(self):
        todo = mixer.blend(ToDo)
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'project': [1], 'text': 'test text'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        new_todo = ToDo.objects.get(id=todo.id)
        self.assertEqual(new_todo.text, 'test text')
        self.client.logout()
