const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()
const isBcrypt = (value) => typeof value === 'string' && /^\$2[aby]\$\d{2}\$/.test(value)

async function migrateTable(model, field = 'password') {
  const rows = await model.findMany({ select: { id: true, [field]: true } })
  let updated = 0

  for (const row of rows) {
    const raw = row[field]
    if (!raw || isBcrypt(raw)) continue

    await model.update({
      where: { id: row.id },
      data: { [field]: await hash(raw, 12) },
    })
    updated++
  }

  return updated
}

async function main() {
  const updatedAdmins = await migrateTable(prisma.admin)
  const updatedEntrenadores = await migrateTable(prisma.entrenador)
  const updatedDeportistas = await migrateTable(prisma.deportista)

  const primaryAdminEmail = process.env.PRIMARY_ADMIN_EMAIL?.trim().toLowerCase()
  const primaryAdminPassword = process.env.PRIMARY_ADMIN_PASSWORD

  let primaryAdminUpserted = false
  if (primaryAdminEmail && primaryAdminPassword) {
    await prisma.admin.upsert({
      where: { email: primaryAdminEmail },
      update: {
        nombre: 'Administrador Principal',
        password: await hash(primaryAdminPassword, 12),
        rol: 'admin',
      },
      create: {
        nombre: 'Administrador Principal',
        email: primaryAdminEmail,
        password: await hash(primaryAdminPassword, 12),
        rol: 'admin',
      },
    })
    primaryAdminUpserted = true
  }

  console.log(
    JSON.stringify({
      updatedAdmins,
      updatedEntrenadores,
      updatedDeportistas,
      primaryAdminUpserted,
    })
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
