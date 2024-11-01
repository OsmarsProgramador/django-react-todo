# backend/backend/urls.py
from django.contrib import admin

# adicionar include ao caminho
from django.urls import path, include

# importar views de todo
from todo import views

# importar routers do framework REST
# necessário para roteamento
from rest_framework import routers

# criar um objeto router
router = routers.DefaultRouter()

# registrar o router
router.register(r'tasks', views.TodoView, 'task')

urlpatterns = [
    path('admin/', admin.site.urls),

    # adicionar outro caminho aos padrões de URL
    # quando você visitar localhost:8000/api
    # você deve ser redirecionado para o framework REST do Django
    path('api/', include(router.urls))
]







