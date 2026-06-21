import Docker from 'dockerode'

export default defineEventHandler(async (event) => {
  await requireSession(event)

  const socketPath = process.platform === 'win32'
    ? '//./pipe/docker_engine'
    : '/var/run/docker.sock'

  const docker = new Docker({ socketPath })
  const containers = await docker.listContainers({ all: true })

  return {
    ok: true,
    containers: containers.map(c => ({
      id: c.Id.slice(0, 12),
      names: c.Names,
      image: c.Image,
      status: c.Status,
      state: c.State,
    })),
  }
})
