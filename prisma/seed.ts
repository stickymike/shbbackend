import { Photon } from "@generated/photon";
const photon = new Photon();

async function main() {
  const user1 = await photon.users.create({
    data: {
      code: 8846,
      email: "dave@shb.com",
      password: "$2a$10$UxEKI.umY85GJ5iPDP/sWe5dJ0pP./byp.F53uSGQFnm9e9Eph2SW", //pw:dave
      title: "SauceMan",
      firstName: "Dave",
      lastName: "Dave's Last"
    }
  });
  const user2 = await photon.users.create({
    data: {
      code: 7746,
      email: "nick@shb.com",
      password: "$2a$10$WCpH1TgN2BUVVgbyLV.qAetC/pmwPBdW86ucbm8StQRH3olNPyl8C", //pw:nick
      title: "SauceMan",
      firstName: "Nick",
      lastName: "Dunn",
      permissions: { set: "ADMIN" }
    }
  });
  const timerole1 = await photon.timeRoles.create({
    data: {
      name: "First Time Role",
      shortName: "First",
      description: "Nothing to See",
      payRate: 1000
    }
  });
  const timerole2 = await photon.timeRoles.create({
    data: {
      name: "Second Time Role",
      shortName: "Second",
      description: "Nothing to SeeHere",
      payRate: 1200
    }
  });

  await photon.users.update({
    where: { email: "dave@shb.com" },
    data: { timeRoles: { connect: { id: timerole1.id } } }
  });
  await photon.users.update({
    where: { email: "dave@shb.com" },
    data: { timeRoles: { connect: { id: timerole2.id } } }
  });

  const timecard1 = await photon.timeCards.create({
    data: {
      punchTime: new Date(),
      punchType: "CLOCKIN",
      user: { connect: { id: user1.id } },
      timeRole: { connect: { id: timerole1.id } }
    }
  });
  // const timecard2 = await photon.timeCards.create({
  //   data: {
  //     punchTime: new Date(),
  //     punchType: "CLOCKIN",
  //     user: { connect: { id: "ck0xq1hoy00009wtrhah6k9uo" } },
  //     timeRole: { connect: { id: "ck0xq1hpx00029wtr364o0kc8" } }
  //   }
  // });

  // const user2 = await photon.users.create({
  //   data: {
  //     email: 'bob@prisma.io',
  //     name: 'Bob',
  //     password: '$2a$10$w7sLG/PKRLjteGcY9RKmwuD5fdAD2s1q1.hnfk8e9G1eXcpzrm3W2',
  //     posts: {
  //       create: [
  //         {
  //           title: 'Subscribe to GraphQL Weekly for community news',
  //           content: 'https://graphqlweekly.com/',
  //           published: true,
  //           abc: "a"

  //         },
  //         {
  //           title: 'Follow Prisma on Twitter',
  //           content: 'https://twitter.com/prisma',
  //           published: false,
  //           abc: "a"

  //         },
  //       ],
  //     },
  //   },
  // })

  console.log({ user1, user2, timerole1, timerole2, timecard1 });
  // console.log({ timecard2 });
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect();
  });
