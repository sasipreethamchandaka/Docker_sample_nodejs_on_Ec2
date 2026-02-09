# 🚀 Node.js Application Deployment with Docker on AWS EC2

This guide explains how to deploy a simple **Node.js application** inside a **Docker container** on an **AWS EC2 instance**. It is clean, step-by-step, and beginner‑friendly.

---

## 📌 Prerequisites

* AWS EC2 instance (Amazon Linux)
* Security Group with **port 3000 open**
* Git installed on EC2
* Internet access

---

## 1️⃣ Clone the Project

```bash
git clone https://github.com/mahimapatel93/Docker_sample_nodejs_on_Ec2.git
cd Docker_sample_nodejs_on_Ec2
```

📌 Replace `<your-username>` and `<your-repo-name>` with your GitHub details.

---

## 2️⃣ Install Docker on EC2

Update packages:

```bash
sudo yum update -y
```

Install Docker:

```bash
sudo yum install docker -y
```

Start Docker service:

```bash
sudo service docker start
```

(Optional) Add user to Docker group:

```bash
sudo usermod -a -G docker ec2-user
```

⚠️ Log out and log back in after this step.

Verify Docker:

```bash
docker --version
docker info
```

---

## 3️⃣ Project Structure

After cloning, your project should contain:

```
├── index.js
├── package.json
├── Dockerfile
└── README.md
```

---

## 4️⃣ Node.js Application (index.js)

```js
var http = require('http');

http.createServer(function (req, res) {
  res.write('Hello from Node.js inside a Docker container! 🚀');
  res.end();
}).listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
```

📌 **Important:** The app must listen on `0.0.0.0` for Docker access.

---

## 5️⃣ Dockerfile

```Dockerfile
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

---

## 6️⃣ Build Docker Image (custom image)

```bash
docker build -t node-app .
```

---

## 7️⃣ Run Docker Container

```bash
docker run -d -p 3000:3000 --name node-app node-app
```

Check running containers:

```bash
docker ps
```

---

## 8️⃣ Test the Application

### From EC2 Terminal:

```bash
curl http://localhost:3000
```

Expected output:

```
Hello from Node.js inside a Docker container! 🚀
```

### From Browser:

```
http://<EC2-PUBLIC-IP>:3000
```

📌 Make sure **port 3000** is allowed in the EC2 Security Group.

---

## 9️⃣ Logs & Debugging

View logs:

```bash
docker logs -f node-app
```

Access container shell:

```bash
docker exec -it node-app /bin/bash
```

---

## 🔟 Stop & Remove Container

```bash
docker stop node-app
docker rm node-app
```

---

## 📝 Notes

* Always rebuild the image after code changes:

```bash
docker build -t node-app .
docker restart node-app
```

* Use `docker ps -a` to check stopped containers
* Ensure EC2 Security Group allows inbound traffic on port **3000**

---

## ✅ Deployment Complete 🎉

Your Node.js app is now running inside Docker on AWS EC2!
