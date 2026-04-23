import WorkIcon from '@mui/icons-material/Work';
import JobList from './JobList';
import JobCreate from './JobCreate';
import JobEdit from './JobEdit';
import JobShow from "./JobShow";

export default {
    list: JobList,
    create: JobCreate,
    edit: JobEdit,
    show: JobShow,
    icon: WorkIcon,
    recordRepresentation: (record: any) => record.description,
};