import { AppointmentEntity } from "src/appointment/entities/appointment.entity";
import { DoctorEntity } from "src/doctor/entities/doctor.entity";
import { Base } from "src/lib/entities/base";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { WeekDay } from "../slot.enum";

@Entity('slots')
export class SlotEntity extends Base {

    @Column({
        type: 'enum',
        enum: WeekDay
    })
    weekDay: WeekDay

    @Column({ type: 'time' })
    start: string

    @Column({ type: 'time' })
    end: string

    @ManyToOne(() => DoctorEntity, doctor => doctor.slots)
    @JoinColumn({
        name: 'doctorId'
    })
    doctor: DoctorEntity

    @OneToMany(
        () => AppointmentEntity,
        appointment => appointment.slot
    )
    appointments: AppointmentEntity[]

}
