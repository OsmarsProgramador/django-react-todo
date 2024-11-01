# backend/toto/views.py
from django.shortcuts import render

# importar view sets do framework REST
from rest_framework import viewsets

# importar o TodoSerializer do arquivo de serializadores
from .serializers import TodoSerializer

# importar o modelo Todo do arquivo de modelos
from .models import Todo

# criar uma classe para os viewsets do modelo Todo
class TodoView(viewsets.ModelViewSet):

    # criar uma classe de serializador e 
    # atribuí-la à classe TodoSerializer
    serializer_class = TodoSerializer

    # definir uma variável e preenchê-la 
    # com os objetos da lista Todo
    queryset = Todo.objects.all()



