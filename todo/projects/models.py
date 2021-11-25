from django.db import models

# Create your models here.
from users.models import User


class Project(models.Model):
    name = models.CharField(verbose_name='Название', max_length=1024, blank=False, default=None)
    repo_url = models.URLField(verbose_name='Ссылка на репозиторий', max_length=1024, blank=True)
    user = models.ManyToManyField(User, verbose_name='Пользователь')

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    project = models.ForeignKey(Project, verbose_name='Проект', blank=False, on_delete=models.CASCADE)
    text = models.TextField(verbose_name='Текст заметки', blank=False)
    created = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    updated = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    user = models.ForeignKey(User, verbose_name='Пользователь', null=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name='Активна', default=True)
