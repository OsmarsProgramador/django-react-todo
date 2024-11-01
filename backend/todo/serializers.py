# backend/toto/serializers.py
# importar serializadores do framework REST
from rest_framework import serializers

# importar o modelo de dados todo
from .models import Todo

# criar uma classe serializadora
class TodoSerializer(serializers.ModelSerializer):

    # criar uma metaclasse
    class Meta:
        model = Todo
        fields = ('id', 'title','description','completed')
