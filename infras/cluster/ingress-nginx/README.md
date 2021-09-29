# Nginx Ingress Controller Helm

### Create Kubernetes Cluster on AWS

```bash
eksctl create cluster -f eksctl-cluster.yaml
```

### Get values file from

```bash
https://github.com/kubernetes/ingress-nginx/tree/master/charts/ingress-nginx
```

### Initialize a Helm Chart Repository

```bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
```

### Install Nginx Ingress Helm Chart

```bash
helm install sample-ingress ingress-nginx/ingress-nginx -f values.yaml
```

### Deploy Sample App

```bash
kubectl apply -f sample-app.yaml
```

### Install Cert Manager

```sh
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.5.3/cert-manager.yaml
```

### Assign a DNS name

### Configure Let’s Encrypt Issuer

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt-cluster-issuer
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: your-email@email.com
    privateKeySecretRef:
      name: letsencrypt-cluster-issuer-key
    solvers:
      - http01:
          ingress:
            class: nginx
```

### Deploy a TLS Ingress Resource

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-srv
  annotations:
    kubernetes.io/ingress.class: nginx
    nginx.ingress.kubernetes.io/use-regex: "true"
    cert-manager.io/issuer: "letsencrypt-cluster-issuer"
spec:
  tls:
    - hosts:
        - your-domain.com
      secretName: tls-secret
  rules:
    - host: your-domain.com
      http:
        paths:
          - path: /graphql
            pathType: Prefix
            backend:
              service:
                name: api-gateway-srv
                port:
                  number: 3000
```

### Clean Up

```bash
helm repo remove ingress-nginx
eksctl delete cluster -f eksctl-cluster.yaml
```
