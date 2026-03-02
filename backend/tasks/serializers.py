from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'description', 'completed', 'owner', 'created_at')
        read_only_fields = ('owner', 'created_at')
        fields = ('id', 'title', 'description', 'completed', 'owner', 'created_at', 'updated_at')
        read_only_fields = ('owner', 'created_at', 'updated_at')
from .models import Book
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
