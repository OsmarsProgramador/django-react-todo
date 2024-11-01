# backend/toto/models.py
from django.db import models

class Todo(models.Model):
    title=models.CharField(max_length=150)
    description=models.CharField(max_length=500)
    completed=models.BooleanField(default=False)

    # representação em string da classe
    def __str__(self):

        # isso retornará o título
        return self.title  


