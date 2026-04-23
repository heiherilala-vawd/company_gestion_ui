import { Create, SimpleForm, TextInput, DateInput, SelectInput, required } from 'react-admin';

const generateId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

export default function JobCreate() {
    return (
        <Create transform={(data) => ({ ...data, id: generateId() })}>
            <SimpleForm>
                <TextInput source="company_id" label="ID Entreprise" validate={[required()]} />
                <TextInput source="description" label="Description" multiline rows={3} />
                <DateInput source="contract_signature_date" label="Date signature contrat" />
                <DateInput source="start_date" label="Date début" />
                <DateInput source="end_date" label="Date fin" />
                <SelectInput
                    source="status"
                    label="Statut"
                    choices={[
                        { id: 'PENDING_SIGNATURE', name: 'En attente signature' },
                        { id: 'IN_PROGRESS', name: 'En cours' },
                        { id: 'COMPLETED', name: 'Terminé' },
                    ]}
                    defaultValue="PENDING_SIGNATURE"
                />
            </SimpleForm>
        </Create>
    );
}