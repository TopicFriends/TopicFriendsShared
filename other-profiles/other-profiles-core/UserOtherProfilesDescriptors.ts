import { FormControl } from '@angular/forms'
import { OtherProfile } from './OtherProfile';

export function getOtherProfileName(otherProfile: OtherProfile) {
  return otherProfile && otherProfile.userName
}

export function otherProfileUserName(formControl: FormControl) {
  // return formControl.value || "" // || "" to prevent firebase complaining about undefined
  return formControl.value || null // || "" to prevent firebase complaining about undefined
}

export class UserOtherProfileDescriptor {
  websiteName?: string
  protocol?: string
  urlPrefix?: string
  whatIsEnough?: string
  whatIsEnoughVerb?: string
  iconClass?: string
  iconImg?: string
  icon?: string
  id?: string

  constructor(initFrom: UserOtherProfileDescriptor) {
    Object.assign(this, initFrom)
    if (!this.whatIsEnough) {
      this.whatIsEnough = 'user name'
      this.whatIsEnoughVerb = 'is'
    }
  }
}

export type UserOtherProfilesDescriptorVals<T> = Partial<{
  [P in keyof UserOtherProfilesDescriptorsDefs]: T // https://www.typescriptlang.org/docs/handbook/advanced-types.html - TypeScript Mapped Types
}>

export function descriptor(d: UserOtherProfileDescriptor) {
  return new UserOtherProfileDescriptor(d)
}

function prepareDescriptorsList(descriptorsMap: UserOtherProfilesDescriptorsDefs) {
  let ret = [] as UserOtherProfileDescriptor[]
  for ( let key in descriptorsMap ) {
    if (descriptorsMap.hasOwnProperty(key)) {
      // console.log('key: ', key)
      let descriptor = descriptorsMap[key]
      descriptor.id = key
      descriptor.websiteName = descriptor.websiteName || key
      // descriptor.iconImg = descriptor.iconImg || ('assets/images/logos/' + key.toLowerCase() + '.svg')
      descriptor.iconImg = descriptor.iconImg || (! descriptor.iconClass && ('assets/images/logos/' + key.toLowerCase() + '.svg') )

      ret.push(descriptor)
    }
  }
  return ret
}

export class UserOtherProfilesDescriptorsDefs {
  static array = prepareDescriptorsList(new UserOtherProfilesDescriptorsDefs())

  eMail = descriptor({
    websiteName: 'E-Mail',
    protocol: 'mailto:',
    urlPrefix: '',
    // iconClass: 'ion-social-twitter',
    // iconImg: 'assets/images/clients/TopicFriends.svg',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
  })
  TopicFriends = descriptor({
    websiteName: 'TopicFriends',
    urlPrefix: 'TopicFriends.org/',
    // iconClass: 'ion-social-twitter',
    // iconImg: 'assets/images/clients/TopicFriends.svg',
    icon: '<svg viewBox="0 0 1121 1254" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n' +
      '    <path d="M1062.04,271.139C981.592,223.873 900.456,176.74 819.236,130.081C751.636,91.272 683.96,52.786 616.571,14.804C581.628,-4.943 538.567,-4.933 503.492,14.823C455.391,41.944 407.149,69.321 358.906,96.898C258.32,154.38 157.685,212.707 58.143,271.225C23.323,291.695 1.746,329.04 1.328,369.273C-0.39,540.122 -0.438,713.32 1.166,884.311C1.556,924.582 23.123,961.958 57.934,982.425C205.245,1069.05 354.957,1155.3 503.445,1239.14C538.55,1258.94 581.637,1258.95 616.609,1239.16C765.078,1155.36 914.827,1069.13 1062.24,982.511C1097.06,962.044 1118.64,924.66 1119.03,884.377C1120.61,713.337 1120.56,540.094 1118.87,369.198C1118.46,328.954 1096.86,291.598 1062.04,271.139ZM506.718,1050C496.43,1050 488.089,1041.66 488.089,1031.37C488.089,944.473 488.089,579.527 488.089,492.629C488.089,482.34 479.749,474 469.46,474L266.718,474C256.43,474 248.089,465.66 248.089,455.371C248.089,427.754 248.089,376.246 248.089,348.629C248.089,343.688 250.052,338.95 253.546,335.456C257.039,331.963 261.778,330 266.718,330C358.482,330 761.696,330 853.46,330C858.401,330 863.139,331.963 866.633,335.456C870.127,338.95 872.089,343.688 872.089,348.629C872.089,376.246 872.089,427.754 872.089,455.371C872.089,465.66 863.749,474 853.46,474C808.696,474 695.483,474 650.718,474C640.43,474 632.089,482.34 632.089,492.629C632.089,520.246 632.089,571.754 632.089,599.371C632.089,609.66 640.43,618 650.718,618L757.46,618C767.749,618 776.089,626.34 776.089,636.629L776.089,743.371C776.089,753.66 767.749,762 757.46,762L650.718,762C640.43,762 632.089,770.34 632.089,780.629C632.089,832.693 632.089,979.307 632.089,1031.37C632.089,1041.66 623.749,1050 613.46,1050C585.843,1050 534.336,1050 506.718,1050Z" style="fill-rule:nonzero;"/>\n' +
      '</svg>'
  })
  linkedIn = descriptor({
    websiteName: 'LinkedIn',
    urlPrefix: 'linkedin.com/in/',
    // iconClass: 'ion-social-linkedin',
    // iconImg: 'assets/images/logos/linkedin-icon.svg',
    icon: '<svg width="100%" height="100%" viewBox="0 0 130 130" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n' +
      '    <path d="M119.985,0L9.564,0C4.287,0 0,4.182 0,9.339L0,120.225C0,125.386 4.287,129.575 9.564,129.575L119.985,129.575C125.27,129.575 129.577,125.386 129.577,120.225L129.577,9.339C129.577,4.182 125.27,0 119.985,0ZM19.211,48.578L38.43,48.578L38.43,110.415L19.211,110.415L19.211,48.578ZM50.484,48.578L68.92,48.578L68.92,57.026L69.176,57.026C71.741,52.166 78.01,47.039 87.36,47.039C106.821,47.039 110.414,59.846 110.414,76.496L110.414,110.415L91.209,110.415L91.209,80.344C91.209,73.169 91.077,63.946 81.222,63.946C71.22,63.946 69.689,71.758 69.689,79.824L69.689,110.415L50.484,110.415L50.484,48.578ZM28.824,17.839C34.97,17.839 39.962,22.832 39.962,28.979C39.962,35.13 34.97,40.125 28.824,40.125C22.666,40.125 17.68,35.13 17.68,28.979C17.68,22.832 22.666,17.839 28.824,17.839Z" style="fill-rule:nonzero;"/>\n' +
      '</svg>',
  })
  XING = descriptor({
    urlPrefix: 'xing.com/profile/',
    // iconClass: 'ion-social-linkedin',
    // iconImg: 'assets/images/logos/xing-icon.svg',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="426.896 102.499 170.207 200" fill="currentColor"><path d="M442.394 142c-1.736 0-3.197.61-3.934 1.803-.76 1.231-.645 2.818.166 4.424l19.503 33.761c.033.064.033.105 0 .164l-30.648 54.084c-.799 1.592-.76 3.191 0 4.425.736 1.187 2.033 1.966 3.771 1.966h28.844c4.312 0 6.393-2.91 7.867-5.57 0 0 29.973-53.01 31.14-55.068-.118-.19-19.83-34.58-19.83-34.58-1.439-2.557-3.606-5.41-8.03-5.41h-28.849z"/><path d="M563.574 102.501c-4.309 0-6.176 2.714-7.723 5.494 0 0-62.14 110.2-64.188 113.818.105.196 40.984 75.191 40.984 75.191 1.432 2.558 3.641 5.494 8.06 5.494h28.81c1.738 0 3.096-.654 3.828-1.843.77-1.23.748-2.857-.059-4.458l-40.664-74.295a.167.167 0 0 1 0-.189l63.863-112.92c.803-1.594.82-3.22.061-4.452-.736-1.188-2.098-1.843-3.836-1.843h-29.139v.002h.003z"/></svg>',
  })
  // facebook = descriptor({
  //   websiteName: 'Facebook',
  //   urlPrefix: 'facebook.com/',
  //   // iconClass: 'ion-social-facebook',
  // })
  gitHub = descriptor({
    websiteName: 'GitHub',
    urlPrefix: 'github.com/',
    // iconClass: 'ion-social-github',
    // iconImg: 'assets/images/logos/github-icon.svg',
    icon: '<svg viewBox="0 0 256 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" fill="currentColor">\n' +
      '    <g>\n' +
      '        <path d="M128.00106,0 C57.3172926,0 0,57.3066942 0,128.00106 C0,184.555281 36.6761997,232.535542 87.534937,249.460899 C93.9320223,250.645779 96.280588,246.684165 96.280588,243.303333 C96.280588,240.251045 96.1618878,230.167899 96.106777,219.472176 C60.4967585,227.215235 52.9826207,204.369712 52.9826207,204.369712 C47.1599584,189.574598 38.770408,185.640538 38.770408,185.640538 C27.1568785,177.696113 39.6458206,177.859325 39.6458206,177.859325 C52.4993419,178.762293 59.267365,191.04987 59.267365,191.04987 C70.6837675,210.618423 89.2115753,204.961093 96.5158685,201.690482 C97.6647155,193.417512 100.981959,187.77078 104.642583,184.574357 C76.211799,181.33766 46.324819,170.362144 46.324819,121.315702 C46.324819,107.340889 51.3250588,95.9223682 59.5132437,86.9583937 C58.1842268,83.7344152 53.8029229,70.715562 60.7532354,53.0843636 C60.7532354,53.0843636 71.5019501,49.6441813 95.9626412,66.2049595 C106.172967,63.368876 117.123047,61.9465949 128.00106,61.8978432 C138.879073,61.9465949 149.837632,63.368876 160.067033,66.2049595 C184.49805,49.6441813 195.231926,53.0843636 195.231926,53.0843636 C202.199197,70.715562 197.815773,83.7344152 196.486756,86.9583937 C204.694018,95.9223682 209.660343,107.340889 209.660343,121.315702 C209.660343,170.478725 179.716133,181.303747 151.213281,184.472614 C155.80443,188.444828 159.895342,196.234518 159.895342,208.176593 C159.895342,225.303317 159.746968,239.087361 159.746968,243.303333 C159.746968,246.709601 162.05102,250.70089 168.53925,249.443941 C219.370432,232.499507 256,184.536204 256,128.00106 C256,57.3066942 198.691187,0 128.00106,0 Z M47.9405593,182.340212 C47.6586465,182.976105 46.6581745,183.166873 45.7467277,182.730227 C44.8183235,182.312656 44.2968914,181.445722 44.5978808,180.80771 C44.8734344,180.152739 45.876026,179.97045 46.8023103,180.409216 C47.7328342,180.826786 48.2627451,181.702199 47.9405593,182.340212 Z M54.2367892,187.958254 C53.6263318,188.524199 52.4329723,188.261363 51.6232682,187.366874 C50.7860088,186.474504 50.6291553,185.281144 51.2480912,184.70672 C51.8776254,184.140775 53.0349512,184.405731 53.8743302,185.298101 C54.7115892,186.201069 54.8748019,187.38595 54.2367892,187.958254 Z M58.5562413,195.146347 C57.7719732,195.691096 56.4895886,195.180261 55.6968417,194.042013 C54.9125733,192.903764 54.9125733,191.538713 55.713799,190.991845 C56.5086651,190.444977 57.7719732,190.936735 58.5753181,192.066505 C59.3574669,193.22383 59.3574669,194.58888 58.5562413,195.146347 Z M65.8613592,203.471174 C65.1597571,204.244846 63.6654083,204.03712 62.5716717,202.981538 C61.4524999,201.94927 61.1409122,200.484596 61.8446341,199.710926 C62.5547146,198.935137 64.0575422,199.15346 65.1597571,200.200564 C66.2704506,201.230712 66.6095936,202.705984 65.8613592,203.471174 Z M75.3025151,206.281542 C74.9930474,207.284134 73.553809,207.739857 72.1039724,207.313809 C70.6562556,206.875043 69.7087748,205.700761 70.0012857,204.687571 C70.302275,203.678621 71.7478721,203.20382 73.2083069,203.659543 C74.6539041,204.09619 75.6035048,205.261994 75.3025151,206.281542 Z M86.046947,207.473627 C86.0829806,208.529209 84.8535871,209.404622 83.3316829,209.4237 C81.8013,209.457614 80.563428,208.603398 80.5464708,207.564772 C80.5464708,206.498591 81.7483088,205.631657 83.2786917,205.606221 C84.8005962,205.576546 86.046947,206.424403 86.046947,207.473627 Z M96.6021471,207.069023 C96.7844366,208.099171 95.7267341,209.156872 94.215428,209.438785 C92.7295577,209.710099 91.3539086,209.074206 91.1652603,208.052538 C90.9808515,206.996955 92.0576306,205.939253 93.5413813,205.66582 C95.054807,205.402984 96.4092596,206.021919 96.6021471,207.069023 Z" fill="currentColor"></path>\n' +
      '    </g>\n' +
      '</svg>',
  })
  stackOverflow = descriptor({
    websiteName: 'StackOverflow',
    urlPrefix: 'stackoverflow.com/users/',
    // iconImg: 'assets/images/logos/stackoverflow_icon.svg',
    icon: '<svg width="100%" height="100%" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" fill="currentColor" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;"><path d="M388.112,444.724l0,-126.899l42.117,0l0,169.016l-380.149,0l0,-169.016l42.117,0l0,126.899l295.915,0Z" style="fill-rule:nonzero;"/><path d="M138.69,305.792l206.758,43.211l8.751,-41.57l-206.757,-43.212l-8.752,41.571Zm27.349,-98.456l191.442,89.157l17.503,-38.288l-191.442,-89.705l-17.503,38.836Zm53.057,-94.08l162.452,135.103l26.802,-32.272l-162.452,-135.103l-26.802,32.272Zm105.019,-100.097l-33.912,25.161l125.805,169.563l33.912,-25.161l-125.805,-169.563Zm-189.801,388.901l211.134,0l0,-42.118l-211.134,0l0,42.118Z" style="fill-rule:nonzero;"/></svg>',
    // icon: '<svg width="100%" height="100%" viewBox="0 0 114 114" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">\n' +
    //   '    <g transform="matrix(1,0,0,1,13.4317,0)">\n' +
    //   '        <g>\n' +
    //   '            <g>\n' +
    //   '                <path d="M63.277,73.175L19.852,62.643L21.959,53.958L65.384,64.49L63.277,73.175" style="fill:rgb(181,143,82);fill-rule:nonzero;"/>\n' +
    //   '                <path d="M66.188,62.785L26.398,42.453L30.464,34.494L70.255,54.827L66.188,62.785" style="fill:rgb(199,132,49);fill-rule:nonzero;"/>\n' +
    //   '                <path d="M72.317,52.022L38.667,22.623L44.546,15.893L78.197,45.291L72.317,52.022" style="fill:rgb(233,129,44);fill-rule:nonzero;"/>\n' +
    //   '                <path d="M81.575,42.561L56.481,5.588L63.876,0.569L88.969,37.542L81.575,42.561" style="fill:rgb(229,113,42);fill-rule:nonzero;"/>\n' +
    //   '                <path d="M62.582,84.038L17.964,81.602L18.451,72.678L63.069,75.114L62.582,84.038" style="fill:rgb(157,132,105);fill-rule:nonzero;"/>\n' +
    //   '                <path d="M71.833,105.059L71.833,68.035L80.762,68.035L80.768,113.997L0,113.997L0.002,67.996L8.939,67.996L8.939,105.059L71.833,105.059" style="fill:rgb(121,123,123);fill-rule:nonzero;"/>\n' +
    //   '                <rect x="17.84" y="87.221" width="44.987" height="8.937" style="fill:rgb(121,123,123);fill-rule:nonzero;"/>\n' +
    //   '            </g>\n' +
    //   '        </g>\n' +
    //   '    </g>\n' +
    //   '</svg>',
    whatIsEnough: 'user id and name',
    whatIsEnoughVerb: 'are',
  })
  twitter = descriptor({
    websiteName: 'Twitter',
    urlPrefix: 'twitter.com/',
    // iconClass: 'ion-social-twitter',
    icon: '<svg viewBox="0 0 256 209" version="1.1" fill="currentColor" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">\n' +
      '    <g>\n' +
      '        <path d="M256,25.4500259 C246.580841,29.6272672 236.458451,32.4504868 225.834156,33.7202333 C236.678503,27.2198053 245.00583,16.9269929 248.927437,4.66307685 C238.779765,10.6812633 227.539325,15.0523376 215.57599,17.408298 C205.994835,7.2006971 192.34506,0.822 177.239197,0.822 C148.232605,0.822 124.716076,24.3375931 124.716076,53.3423116 C124.716076,57.4586875 125.181462,61.4673784 126.076652,65.3112644 C82.4258385,63.1210453 43.7257252,42.211429 17.821398,10.4359288 C13.3005011,18.1929938 10.710443,27.2151234 10.710443,36.8402889 C10.710443,55.061526 19.9835254,71.1374907 34.0762135,80.5557137 C25.4660961,80.2832239 17.3681846,77.9207088 10.2862577,73.9869292 C10.2825122,74.2060448 10.2825122,74.4260967 10.2825122,74.647085 C10.2825122,100.094453 28.3867003,121.322443 52.413563,126.14673 C48.0059695,127.347184 43.3661509,127.988612 38.5755734,127.988612 C35.1914554,127.988612 31.9009766,127.659938 28.694773,127.046602 C35.3777973,147.913145 54.7742053,163.097665 77.7569918,163.52185 C59.7820257,177.607983 37.1354036,186.004604 12.5289147,186.004604 C8.28987161,186.004604 4.10888474,185.75646 0,185.271409 C23.2431033,200.173139 50.8507261,208.867532 80.5109185,208.867532 C177.116529,208.867532 229.943977,128.836982 229.943977,59.4326002 C229.943977,57.1552968 229.893412,54.8901664 229.792282,52.6381454 C240.053257,45.2331635 248.958338,35.9825545 256,25.4500259"></path>\n' +
      '    </g>\n' +
      '</svg>'
  })

  // StackShare = descriptor({
  //   // urlPrefix: 'https://stackshare.io/',
  //   urlPrefix: 'stackshare.io/',
  // })
  // AngelList = descriptor({
  //   // urlPrefix: 'https://angel.co/',
  //   urlPrefix: 'angel.co/',
  // })

}
