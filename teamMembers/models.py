from django.db import models

# Create your models here.
class TeamMember(models.Model):
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    def __str__(self):
        return self.firstName + ' ' + self.lastName