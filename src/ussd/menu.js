const ACTION = { CLOSE: 'FB', CONTINUE: 'FC' };

const MENU = {
  FIRST_VISIT: {
    step: 0,
    text: ['Ikaze muri SNS:#1) Kinyarwanda #2) English'],
    action: ACTION.CONTINUE
  },
  CHOOSE_ORG: {
    step: 1,
    text: [
      'Hitamo serevisi#1)RAB (Nkunganire)',
      'Please select the service #1) RAB (Nkunganire)'
    ],
    action: ACTION.CONTINUE
  },
  CHOOSE_SERVICE: {
    step: 2,
    text: [
      'Hitamo serevisi #1) Kwiyandikisha #2) Kwinjira#3) Rebe No ikuranga',
      'Please select the service: #1) Register #2) Login#3) SNS number'
    ],
    action: ACTION.CONTINUE
  },
  ENTER_NID: {
    step: 3,
    text: ['Shyiramo nimero ya NID', 'Provide your NID number'],
    action: ACTION.CONTINUE
  },
  CONFIRM_NID: {
    step: 4,
    text: [
      'Uremeza iyi NID: {0} ? #1) Yego#2) Oya',
      'Sure, this NID is Valid {0} ? #1) Yes #2) No'
    ],
    action: ACTION.CONTINUE
  },
  SUCCESS: {
    step: 5,
    text: ['Murakoze', 'Thank you'],
    action: ACTION.CLOSE
  },

  SYSTEM_FAILURE: {
    step: 500,
    text: ['Mwihangane gato, mwongere mugerageze!', 'Sorry, please try again later'],
    action: ACTION.CLOSE
  }
};

module.exports = MENU;
