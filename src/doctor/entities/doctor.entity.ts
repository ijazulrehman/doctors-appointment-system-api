import { AppointmentEntity } from "src/appointment/entities/appointment.entity";
import { Base } from "src/lib/entities/base";
import { SlotEntity } from "src/slot/entities/slot.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";

@Entity('doctors')
export class DoctorEntity extends Base {

    @Column({
        nullable: true
    })
    specialization: string;

    @OneToOne(() => UserEntity, user => user.doctorProfile)
    @JoinColumn({
        name: 'userId'
    })
    user: UserEntity

    @OneToMany(() => SlotEntity, slot => slot.doctor)
    slots: SlotEntity[]

    @OneToMany(
        () => AppointmentEntity,
        appointment => appointment.doctor
    )
    appointments: AppointmentEntity[]
}
