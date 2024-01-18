import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	await prisma.users.upsert({
		where: { username: "admin" },
		update: {},
		create: {
			username: "admin",
			password: await hash("12345678", 10),
		},
	});

	const students = [
		{
			academicRecord: "10011",
			name: "Jon Doe",
			email: "jondoe@email.com",
			cpf: "330.648.610-85",
		},
		{
			academicRecord: "20022",
			name: "Jane Smith",
			email: "janesmith@email.com",
			cpf: "145.789.632-98",
		},
		{
			academicRecord: "30033",
			name: "Alice Johnson",
			email: "alicejohnson@email.com",
			cpf: "987.654.321-01",
		},
		{
			academicRecord: "40044",
			name: "Bob Anderson",
			email: "bobanderson@email.com",
			cpf: "123.456.789-09",
		},
		{
			academicRecord: "50055",
			name: "Eva Williams",
			email: "evawilliams@email.com",
			cpf: "567.890.123-45",
		},
		{
			academicRecord: "60066",
			name: "Chris Taylor",
			email: "christaylor@email.com",
			cpf: "876.543.210-98",
		},
		{
			academicRecord: "70077",
			name: "Sophia Brown",
			email: "sophiabrown@email.com",
			cpf: "234.567.890-12",
		},
		{
			academicRecord: "80088",
			name: "David Miller",
			email: "davidmiller@email.com",
			cpf: "678.901.234-56",
		},
		{
			academicRecord: "90099",
			name: "Olivia White",
			email: "oliviawhite@email.com",
			cpf: "345.678.901-23",
		},
		{
			academicRecord: "10100",
			name: "Michael Davis",
			email: "michaeldavis@email.com",
			cpf: "901.234.567-89",
		},
	];

	for (const student of students) {
		await prisma.students.upsert({
			where: { academicRecord: student.academicRecord },
			update: {},
			create: {
				cpf: student.cpf,
				name: student.name,
				academicRecord: student.academicRecord,
				email: student.email,
			},
		});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
