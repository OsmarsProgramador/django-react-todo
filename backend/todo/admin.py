


from django.contrib import admin

# importar o modelo Todo
from .models import Todo

# criar uma classe para a integração modelo-admin
class TodoAdmin(admin.ModelAdmin):

    # adicionar os campos do modelo aqui
    list_display = ("title", "description", "completed")

# precisamos registrar a classe do modelo e a classe Admin do modelo
# utilizando o método register() da classe admin.site
admin.site.register(Todo, TodoAdmin)
