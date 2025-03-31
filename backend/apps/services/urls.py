from django.urls import path
from .endpoints import (
    CreateSkill, SkillUpdate, SkillDelete,
     PopularSkills, SkillList,
     CreateClientServiceRequest,
     CreateService,
     FetchServices,
     MarkExpertCompleted,
     AutoConfirmService,
     
     
)

urlpatterns = [
    
    ########### SKILLS ########
    path('skills/create', CreateSkill.as_view(), name='create-skill'),
    # path('skills/retrieve/', SkillRetrieve.as_view(), name='retrieve-skill'),
    path('skills/update', SkillUpdate.as_view(), name='update-skill'),
    path('skills/delete', SkillDelete.as_view(), name='delete-skill'),
    # path('skills/experts/', ExpertsForSkill.as_view(), name='experts-for-skill'),
    path('skills/popular', PopularSkills.as_view(), name='popular-skills'),
    path('skills', SkillList.as_view(), name='list-skills'),


    # ###### SERVICES
    path('create_service', CreateService.as_view(), name='create-service'),
    path('fetch_services', FetchServices.as_view(), name='fetch-services'),
    path('create_client_service_request', CreateClientServiceRequest.as_view(), name='create-service-request'),
    path('mark_completed', MarkExpertCompleted.as_view(), name='mark-service-completed'),
    path('auto_confirm', AutoConfirmService.as_view(), name='auto-confirm-service'),
]
