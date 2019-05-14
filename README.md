# Setup

## Prerequisites

| Name             | Description                     |
| ---------------- | ------------------------------- |
| Docker for Mac   | https://www.docker.com/         |
| Homebrew for Mac | https://brew.sh/                |
| VirtualBox       | `brew cask install virtualbox`  |
| Kubernetes CLI   | `brew install kubernetes-cli`   |
| Minikube         | `brew cask install minikube`    |
| kubectx          | `brew install kubectx`          |
| kubefwd          | `brew install txn2/tap/kubefwd` |
| skaffold         | `brew install skaffold`         |

## Creating a local cluster

Minikube is a tool that makes it easy to run Kubernetes locally. Minikube runs a single-node Kubernetes cluster inside a VM on your machine.

Create the minikube cluster: `./devops/create-minikube-cluster.sh` (this will take a couple of minutes).

Once the command has completed a minikube cluster will have started. If you start virtualbox you will see running VM with the name **nexios**.

If you open a new terminal don't forget to switch to the correct minikube profile by running `minikube profile nexios`.

You can stop the cluster by running `minikube stop` and delete the cluster by running `minikube delete`.

Configure docker for minikube `eval $(minikube --profile nexios docker-env)`

## Deploying elasticsearch to the local cluster

Start elasticsearch

```bash
kubectl create -f devops/elasticsearch-deployment.yml
```

Start kibana

```bash
kubectl create -f devops/kibana-deployment.yml
```

Portforwarding

```bash
# manual - exposes the ports at localhost
# kubectl port-forward service/elasticsearch 9200:9200
# kubectl port-forward service/kibana 5601:5601

# met kubefwd
# exposes http://elasticsearch:9200 and http://kibana:5601
# kubefwd needs the sudo password to update /etc/hosts
sudo kubefwd services
```

## Generate SSL key

```bash
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=tasks.default.svc.cluster.local' \
  -keyout localhost-privkey.pem -out localhost-cert.pem
```

## Docker commands

configure docker for minikube `eval $(minikube --profile nexios docker-env)`
build frontend image `docker build -t mvermeulen/frontend:0.0.10 .`
build task-service image `docker build -t mvermeulen/task-service:0.0.4 .`
start frontend `docker run -p 8080:8080 mvermeulen/frontend:0.0.10`
start task-service `docker run -p 8001:8001 mvermeulen/task-service:0.0.4`
ssh into container `docker exec -it <container id> /bin/bash`

## Skaffold commands

Treat any context as local `skaffold config set --kube-context nexios local-cluster true`
Set the default repo `skaffold config set default-repo <myrepo>`
