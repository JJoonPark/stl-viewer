const POWERSAVING = 'CameraControls/POWERSAVING';
const CAMERARATE = 'CameraControls/CAMERARATE';
const TIMESETTING = 'CameraControls/TIMESETTING';
const TIMEVALUESETTING = 'CameraControls/TIMEVALUESETTING'
const EMAILVALUESETTING = 'CameraControls/EMAILVALUESETTING'
const CONFSETTING = 'CameraControls/CONFSETTING'
const CONFVALUESETTING = 'CameraControls/CONFVALUESETTING'
const OPENMATERIAL = 'CameraControls/OPENMATERIAL'
const ETHERNETSPEED = 'CameraControls/ETHERNETSPEED'
const USERINFOSETTING = 'CameraControls/USERINFOSETTING'

export const PowerSaving = (value) =>{ 
    return {
        type: POWERSAVING,
        payload: value
    };
};
export const CameraRate = (value) =>{ 
    return {
        type: CAMERARATE,
        payload: value
    };
};
export const OpenMaterial = (value) =>{ 
    return {
        type: OPENMATERIAL,
        payload: value
    };
}
export const EthernetSpeed = (value) =>{ 
    return {
        type: ETHERNETSPEED,
        payload: value
    };
}
export const TimeSetting = (value) => {
    return {
        type: TIMESETTING,
        payload: value,
    }
}
export const TimeValueSetting = (name, value) => {
    return {
        type: TIMEVALUESETTING,
        payload: name,
        payload2: value
    }
}
export const EmailValueSetting = (name, value) => {
    return {
        type: EMAILVALUESETTING,
        payload: name,
        payload2: value
    }
}
export const ConfSetting = (settings) => {
    return {
        type: CONFSETTING,
        payload: settings
    }
}
export const ConfValueSetting = (name, settings) => {
    return {
        type: CONFVALUESETTING,
        payload: name,
        payload2: settings
    }
}
export const UserInfoSetting = (name, settings) => {
    return {
        type: USERINFOSETTING,
        payload: name,
        payload2: settings
    }
}
const initialState = {
    conf_setting: {
        'Language_Setting' : 1,
        'Lamp_Setting': 1,
        'PowerSave_Setting' : 5,
        'BEEPLEVEL': 0,
        'SecurityPrint_Setting': 0,
        'DegreeUnit_Setting': 0,
        'LengthUnit_Setting': 0,
        'CameraFPS': 3,
        'showNozzleTemperature': 1,
        'showBedTemperature': 1,
        'showChamberTemperature': 1,
        'showFilament': 1,
    },
    email_setting: {
        'emailAddress': 'sindoh@sindoh.com',
        'SMTPServerAddress': '',
        'SMTPPort': '25',
        'SMTPLoginID': '',
        'SMTPLoginPW': '',
        'SMTPSecurityType':0,
    },
    time_setting: {
        'Year' : 2021,
        'Month': 3,
        'Day': 5,
        'Hour': 3,
        'Minutes': 10,
        'AmPm': 'AM',
        'TimeZone': 9,
        'TimeZone_org': 9,
        'Offset': 0,
    },
    date: new Date(),
    open_material: 0,
    ethernet_speed: 0,
    user_info: {
        'USERID': '3DWOX',
        'USERPW': '0000',
    }
}

const Settings = (state = initialState, action) => {
    switch(action.type) {
        case POWERSAVING:
            return {
                ...state,
                conf_setting: {
                    ...state.conf_setting,
                    ['PowerSave_Setting'] : action.payload,
                }
            };
        // case CAMERARATE:
        //     return {
        //         ...state,
        //         conf_setting: {
        //             ...state.conf_setting,
        //             ['CameraFPS'] : action.payload,
        //         }
        //     };
        // case OPENMATERIAL:
        //     return {
        //         ...state,
        //         open_material: action.payload,
        //     };
        // case ETHERNETSPEED:
        //     return {
        //         ...state,
        //         ethernet_spped: action.payload,
        //     };
        // case TIMESETTING:
        //     return {
        //         ...state,
        //         date: new Date(action.payload),
        //     };
        // case TIMEVALUESETTING:
        //     return {
        //         ...state,
        //         time_setting: {
        //             ...state.time_setting, 
        //             [action.payload] : action.payload2,
        //         }
        //     };
        // case EMAILVALUESETTING:
        //     return {
        //         ...state,
        //         email_setting: {
        //             ...state.email_setting, 
        //             [action.payload] : action.payload2,
        //         }
        //     };
        // case CONFSETTING:
        //     return {
        //         ...state,
        //         conf_setting: {
        //             ...state.conf_setting,
        //             ['Language_Setting'] : action.payload.Language_Setting,
        //             ['Lamp_Setting'] : action.payload.Lamp_Setting,
        //             ['PowerSave_Setting'] : action.payload.PowerSave_Setting,
        //             ['BEEPLEVEL'] : action.payload.BEEPLEVEL,
        //             ['SecurityPrint_Setting']: action.payload.SecurityPrint_Setting,
        //             ['DegreeUnit_Setting']: action.payload.DegreeUnit_Setting,
        //             ['LengthUnit_Setting']: action.payload.LengthUnit_Setting,
        //             ['CameraFPS']: action.payload.CameraFPS,
        //         },
        //         email_setting: {
        //             ['emailAddress']: action.payload.emailAddress,
        //             ['SMTPServerAddress']: action.payload.SMTPServerAddress,
        //             ['SMTPPort']: action.payload.SMTPPort,
        //             ['SMTPLoginID']: action.payload.SMTPLoginID,
        //             ['SMTPLoginPW']: action.payload.SMTPLoginPW,
        //             ['SMTPSecurityType']: action.payload.SMTPSecurityType,
        //         }
        //     }
        // case CONFVALUESETTING:
        //     return {
        //         ...state,
        //         conf_setting: {
        //             ...state.conf_setting,
        //             [action.payload] : action.payload2,
        //         }
        //     };
        // case USERINFOSETTING:
        //     return {
        //         ...state,
        //         user_info: {
        //             ...state.user_info,
        //             [action.payload] : action.payload2,
        //         }
        //     };
        default:
            return state;
    }
}

export default Settings;