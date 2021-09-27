## Setup Ingress

```sh
kubectl apply -f common/ns-and-sa.yaml
kubectl apply -f common/default-server-secret.yaml
kubectl apply -f common/nginx-config.yaml
kubectl apply -f rbac/rbac.yaml
kubectl apply -f daemon-set/nginx-ingress.yaml
```

## Check

```sh
kubectl get ds -n nginx-ingress
kubectl get po -n nginx-ingress
```
