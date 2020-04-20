from django.contrib.auth.models import User
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_204_NO_CONTENT, HTTP_401_UNAUTHORIZED


import jwt

from .models import Sneaker, Plan
from .serializers import UserSerializer, SneakerSerializer, PopulatedPlanSerializer, PopulatedSneakerSerializer

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

class ListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request):
        request.data['user'] = request.user.id
        sneakers = Sneaker.objects.filter(user=request.user.id).all()
        serializer = PopulatedSneakerSerializer(sneakers, many=True)

        return Response(serializer.data)

    def post(self, request):
        request.data['user'] = request.user.id
        sneaker = SneakerSerializer(data=request.data)
        if sneaker.is_valid():
            sneaker.save()
            return Response(sneaker.data, status=HTTP_201_CREATED)
        return Response(sneaker.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class DetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, pk):
        request.data['user'] = request.user.id
        sneaker = Sneaker.objects.filter(user=request.user.id).get(pk=pk)
        serializer = PopulatedSneakerSerializer(sneaker)

        return Response(serializer.data)

    def put(self, request, pk):
        request.data['user'] = request.user.id
        sneaker = Sneaker.objects.get(pk=pk)
        if sneaker.user.id != request.user.id:
            return Response(status=HTTP_401_UNAUTHORIZED)
        updated_sneaker = SneakerSerializer(sneaker, data=request.data)
        if (updated_sneaker.is_valid()):
            updated_sneaker.save()
            return Response(updated_sneaker.data)
        return Response(updated_sneaker.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        request.data['user'] = request.user.id
        sneaker = Sneaker.objects.get(pk=pk)
        sneaker.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class PlanListView(APIView):
    permission_classes = (IsAuthenticated, )
    queryset = Plan.objects.all()
    serializer_class = PopulatedPlanSerializer

    def get(self, request):
        request.data['user'] = request.user.id
        # Date param
        plan = Plan.objects.all()
        serializer = PopulatedPlanSerializer(plan, many=True)

        return Response(serializer.data)