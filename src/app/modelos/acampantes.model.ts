export class Acampante {
    id?: number;
    tipo_entrada: string;
    cargo: string;
    nombre_completo: string;
    email: string;
    tipo_sangre: string;
    tipo_documento_identificacion: string;
    numero_identificacion: number;
    fecha_nacimiento: Date; // o string, según preferencia
    fecha_ingreso_club: Date; // o string
    telefono: number;
    direccion: string;
    Edad: number;
    eps_afiliada: string;
    alergico: string;
    medicamento_alergias: string;
    enfermedades_cronicas: string;
    medicamento_enfermedades_cronicas: string;
    en_caso_de_accidente_avisar_a: string;
    relacion_persona_de_contacto: string;
    telefono_persona_contacto: number;
    club_id: number;

    constructor(data?: Partial<Acampante>) {
        this.id = data?.id;
        this.tipo_entrada = data?.tipo_entrada || '';
        this.cargo = data?.cargo || '';
        this.nombre_completo = data?.nombre_completo || '';
        this.email = data?.email || '';
        this.tipo_sangre = data?.tipo_sangre || '';
        this.tipo_documento_identificacion = data?.tipo_documento_identificacion || '';
        this.numero_identificacion = data?.numero_identificacion || 0;
        this.fecha_nacimiento = data?.fecha_nacimiento || new Date();
        this.fecha_ingreso_club = data?.fecha_ingreso_club || new Date();
        this.telefono = data?.telefono || 0;
        this.direccion = data?.direccion || '';
        this.Edad = data?.Edad || 0;
        this.eps_afiliada = data?.eps_afiliada || '';
        this.alergico = data?.alergico || '';
        this.medicamento_alergias = data?.medicamento_alergias || '';
        this.enfermedades_cronicas = data?.enfermedades_cronicas || '';
        this.medicamento_enfermedades_cronicas = data?.medicamento_enfermedades_cronicas || '';
        this.en_caso_de_accidente_avisar_a = data?.en_caso_de_accidente_avisar_a || '';
        this.relacion_persona_de_contacto = data?.relacion_persona_de_contacto || '';
        this.telefono_persona_contacto = data?.telefono_persona_contacto || 0;
        this.club_id = data?.club_id || 0;
    }
}