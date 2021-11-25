from rest_framework import serializers
from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer
from projects.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    # user = UserModelSerializer(many=True)
    # user = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
