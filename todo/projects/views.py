from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from projects.models import Project, ToDo
from projects.serializers import ProjectModelSerializer, ToDoModelSerializer


# Create your views here.

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    # parser_classes = (CamelCaseJSONParser,)


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    # parser_classes = (CamelCaseJSONParser,)
