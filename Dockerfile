# * > See https://bun.com/docs/guides/ecosystem/docker

FROM oven/bun AS base
WORKDIR /app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/dist/index.js .
COPY --from=prerelease /app/package.json .

RUN chown -R bun:bun /app

USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "index.js" ]
