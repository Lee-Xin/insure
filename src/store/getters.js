import {IS_TOKEN} from './getter_type'

export default {
    [IS_TOKEN]: state => {
        if (state.token && state.token !== '') {
            return true;
        }
        return false;
    }
}