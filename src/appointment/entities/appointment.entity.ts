import { DoctorEntity } from "src/doctor/entities/doctor.entity";
import { Base } from "src/lib/entities/base";
import { PatientEntity } from "src/patient/entities/patient.entity";
import { SlotEntity } from "src/slot/entities/slot.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({
    name: 'appointments'
})
export class AppointmentEntity extends Base {


    @ManyToOne(
        () => PatientEntity,
        patient => patient.appointments
    )
    @JoinColumn({
        name: 'patientId'
    })
    patient: PatientEntity

    @ManyToOne(
        () => DoctorEntity,
        doctor => doctor.appointments
    )
    @JoinColumn({
        name: 'doctorId'
    })
    doctor: DoctorEntity

    @ManyToOne(
        () => SlotEntity,
        slot => slot.appointments
    )
    @JoinColumn({
        name: 'slotId'
    })
    slot: SlotEntity

    @Column({
        type: 'time with time zone'
    })
    startAt: Date

    @Column({
        type: 'time with time zone'
    })
    endAt: Date

}
