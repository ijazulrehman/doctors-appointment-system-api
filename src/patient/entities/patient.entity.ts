import { AppointmentEntity } from "src/appointment/entities/appointment.entity";
import { Base } from "src/lib/entities/base";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('patients')
export class PatientEntity extends Base {

    @Column({
        nullable: true,
    })
    bloodGroup: string;

    @OneToOne(() => UserEntity, user => user.patientProfile)
    @JoinColumn({
        name: 'userId'
    })
    user: UserEntity;

    @OneToMany(
        () => AppointmentEntity,
        appointment => appointment.patient
    )
    appointments: AppointmentEntity[]
}
