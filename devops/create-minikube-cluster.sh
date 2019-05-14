#!/bin/bash
minikube profile nexios
minikube --profile nexios config set memory 6144
minikube --profile nexios config set cpus 2
minikube --profile nexios config set disk-size 10g
minikube --profile nexios config set vm-driver virtualbox
minikube start
eval $(minikube --profile nexios docker-env)