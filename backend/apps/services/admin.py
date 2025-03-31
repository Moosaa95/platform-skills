from django.contrib import admin
from .models import Skill, Service
# Register your models here.

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    pass


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass