/*
 * @format
 */
import { Entity, Column, Index, OneToMany, PrimaryGeneratedColumn, BeforeInsert, OneToOne, AfterInsert } from "typeorm";
import { getJWT, getHash, compareHash, verifyJWT } from "../../lib/encryption";
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Base } from "../../lib/entities/base";
import { ApiProperty } from "@nestjs/swagger";
import { UserGender, UserRole } from "../user.enum";
import { Transform } from "class-transformer";
import { DoctorEntity } from "src/doctor/entities/doctor.entity";
import { PatientEntity } from "src/patient/entities/patient.entity";


@Entity({
    name: 'users'
})
export class UserEntity extends Base {
    static findByToken(token: string): Promise<UserEntity> {
        if (!token || token.length === 0) {
            return Promise.resolve(null);
        }
        let payload: { id: string };
        try {
            payload = verifyJWT(token) as any;
        } catch (e) {
            console.warn(Promise.resolve(null));
        }
        const { id } = payload;
        if (!id) {
            return Promise.resolve(null);
        }
        return UserEntity.findOne({
            where: { id }
        });
    }

    @ApiProperty()
    @Column()
    @Index({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    email: string;

    @ApiProperty()
    @Column({ nullable: true })
    name: string;

    @ApiProperty()
    @Column({ nullable: true })
    phoneNumber: string;

    @ApiProperty()
    @Column({
        nullable: true,
        type: 'date'
    })
    dob: Date

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: UserGender,
        nullable: true
    })
    gender: UserGender

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: UserRole,
    })
    role: UserRole


    @Column({ nullable: true })
    @IsNotEmpty()
    encryptedPassword: string;

    password: string;


    @OneToOne(() => DoctorEntity, doctor => doctor.user)
    doctorProfile: DoctorEntity

    @OneToOne(() => PatientEntity, doctor => doctor.user)
    patientProfile: PatientEntity

    async comparePassword(plainString: string): Promise<boolean> {
        return await compareHash(plainString, this.encryptedPassword);
    }

    get jwt(): string {
        if (!this.id) {
            return;
        }
        return getJWT({
            id: this.id,
            name: this.name,
            role: this.role,
            email: this.email
        });
    }

    @BeforeInsert()
    async hashPassword() {
        this.encryptedPassword = await getHash(this.password);
    }

    @AfterInsert()
    async populatePerofile() {
        if (this.role === UserRole.DOCOTOR) {
            const doctor = new DoctorEntity({
                user: {
                    id: this.id
                }
            });

            doctor.save();
        } else if (this.role === UserRole.PATIENT) {
            const patient = new PatientEntity({
                user: {
                    id: this.id
                }
            });

            patient.save();
        }

    }
}
