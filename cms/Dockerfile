FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./ 

RUN pnpm install --prod --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]