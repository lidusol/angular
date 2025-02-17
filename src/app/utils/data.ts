import { DeviceInfo } from 'ngx-device-detector';
import { ImgCropperEvent } from '@alyle/ui/image-cropper/public_api';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Country } from 'ngx-intl-tel-input/lib/model/country.model';
import { CountryISO } from 'ngx-intl-tel-input';
import { Moment } from 'moment';
import * as moment from 'moment';
export const isNil = (value: any): value is (null|undefined) => {
  return value === null || typeof(value) === 'undefined';
};

export const isObject = (value: any): boolean => {
  return value && value.constructor === Object;
};

export const isBlank = (value: any): boolean => {
  return isNil(value) ||
    (isObject(value) && Object.keys(value).length === 0) ||
    value.toString().trim() === '';
};

export const isPresent = (value: any): boolean => {
  return !isBlank(value);
};

export interface CREDENTIALS_AUTH_FLOW{
  token?: string,
  refresh_token?: string,
  token_uri?: string,
  scopes?: string
}

export class CustomValidators {

    public static uniqueBy = (field: string, caseSensitive: boolean = true): ValidatorFn => {
        return (formArray: FormArray): { [key: string]: boolean } => {
            const controls: AbstractControl[] = formArray.controls.filter((formGroup: FormGroup) => {
                return isPresent(formGroup.get(field).value);
            });
            const uniqueObj: any = { uniqueBy: true };
            let find: boolean = false;

            if (controls.length > 1) {
                controls.map(formGroup => formGroup.get(field)).forEach(x => x.errors && delete x.errors['uniqueBy']);
                for (let i: number = 0; i < controls.length; i++) {
                    const formGroup: FormGroup = controls[i] as FormGroup;
                    const mainControl: AbstractControl = formGroup.get(field);
                    const val: string = mainControl.value;

                    const mainValue: string = caseSensitive ? val.toLowerCase() :  val;
                    controls.forEach((group: FormGroup, index: number) => {
                        if (i === index) {
                            return;
                        }

                        const currControl: any = group.get(field);
                        const tempValue: string = currControl.value;
                        const currValue: string = caseSensitive ? tempValue.toLowerCase() : tempValue;
                        let newErrors: any;

                        if ( mainValue === currValue) {
                            if (isBlank(currControl.errors)) {
                                newErrors = uniqueObj;
                            } else {
                                newErrors = Object.assign(currControl.errors, uniqueObj);
                            }
                            currControl.setErrors(newErrors);
                            find = true;
                        }
                    });
                }

                if (find) {
                    return uniqueObj;
                }
            }

            return null;
        };
    }
}

export interface ASSET_TEXT{
  assetText?: string;
}

export interface OBJECTIVES {
  obj_id: string,
  primary:{
    icon: string,
    title: string
  },
  secondary:{
    icon: string,
    title: string,
    description: string,
  }
}
export interface USER_INTEREST{
  id?: string,
  criterionId?: number,
  name: string,
  userInterestParentId?:string,
  type?: string,
  criterionType?: string,
  isTargeted?: boolean,
  isExcluded?:boolean,
}

export interface DEVICE_INTERFACE{
  id?: number,
  criterionId?: number,
  name?: string,
  type?: string,
  criterionType?: string,
  isTargeted?: boolean,
  isExcluded?:boolean,
}

export interface PENDING_TRANSACTION{
  uid: string;
  accountId: string;
  country_code: string;
  transaction_info:BIZAO_CARD_RESPONSE;
  provider?: string;
  auth_info?: BIZAO_TOKEN_RESPONSE;
}

export interface BIZAO_SUCCESS{
  "meta": {
    "type": string,
    "source": string,
    "channel": string
  },
  "status": string,
  "amount": string,
  "order-id": string,
  "currency": string,
  "reference": string,
  "date": string,
  "state": string,
  "country-code": string,
  "user_msisdn": string,
  "Transaction-id" : string
    
}


export const DEVICES_DATA: DEVICE_INTERFACE[] = [
  {
    id: 30000,
    criterionId: 	30000,
    name: 'Ordinateur',
    type: 'PLATFORM',
    criterionType: 'PLATFORM',
    isTargeted: false,
    isExcluded: false

  },
  {
    id: 30001,
    criterionId: 	30001,
    name: 'Smartphone',
    type: 'PLATFORM',
    criterionType: 'PLATFORM',
    isTargeted: false,
    isExcluded: false

  },
  {
    id: 30002,
    criterionId: 	30002,
    name: 'Tablette',
    type: 'PLATFORM',
    criterionType: 'PLATFORM',
    isTargeted: false,
    isExcluded: false

  },
  {
    id: 30004,
    criterionId: 	30004,
    name: 'Smart Tv',
    type: 'PLATFORM',
    criterionType: 'PLATFORM',
    isTargeted: false,
    isExcluded: false

  }
]

export interface CHANNEL_FORMAT {
obj_id: string,
primary:{
  icon: string,
  title: string,
  description: string,
},
secondary:{
  icon: string,
  title: string,
  description: string,
}
}


export const OBJECTIVES_DATA: OBJECTIVES[] = [
  {
    obj_id: '1',
    primary: {
      icon: 'local_offer',
      title: 'Ventes',
    },
    secondary: {
      icon: 'local_offer',
      title: 'Ventes',
      description: 'Générer des ventes en ligne, via une application, par téléphone ou en magasin'
    }
  },
  {
    obj_id: '2',
    primary: {
      icon: 'people',
      title: 'Prospects',
    },
    secondary: {
      icon: 'people',
      title: 'Prospects',
      description: "Attirer les prospects et générer d'autres conversions en encourageant les clients à passer à l'action"
    }
  },
  {
    obj_id: '3',
    primary: {
      icon: 'web',
      title: 'Traffic vers le site web',
    },
    secondary: {
      icon: 'web',
      title: 'Traffic vers le site web',
      description: 'Attirer sur votre site Web les personnes intéressées par vos produits ou services'
    }
  },
  {
    obj_id: '4',
    primary: {
      icon: 'auto_awesome',
      title: 'Intérêt pour la marque et les produits',
    },
    secondary: {
      icon: 'auto_awesome',
      title: 'Intérêt pour la marque et les produits',
      description: 'Inciter les utilisateurs à découvrir vos produits ou services'
    }
  },
  {
    obj_id: '5',
    primary: {
      icon: 'stars',
      title: 'Audience et notoriété de la marque',
    },
    secondary: {
      icon: 'stars',
      title: 'Audience et notoriété de la marque',
      description: 'Toucher une audience élargie et renforcer la notoriété de votre marque'
    }
  },
  {
    obj_id: '6',
    primary: {
      icon: 'settings',
      title: 'Sans objectif',
    },
    secondary: {
      icon: 'settings',
      title: 'Sans objectif',
      description: 'Objectif non spécifié'
    }
  },
]

export const CHANNEL_DATA: CHANNEL_FORMAT[] = [
  {
    obj_id: 'search',
    primary: {
      icon: 'assets/gif/rsa.gif',
      title: 'Annonces sur le moteur de recherche',
      description: "Vos annonces apparaissent dans le moteur de recherche de Google lorsque des clients potentiels recherchent des mots clés liés à vote activité.  Vous ne payez que si une personne interagit avec votre annonce."
    },
    secondary: {
      icon: 'pageview',
      title: 'Annonces sur le moteur de recherche',
      description: "Vos annonces apparaissent dans le moteur de recherche de Google lorsque des clients potentiels recherchent des mots clés liés à vote activité. Vous ne payez que si une personne interagit avec votre annonce."
    }
  },
  {
    obj_id: 'display',
    primary: {
      icon: 'assets/gif/da.gif',
      title: 'Annonces avec des visuels',
      description: "Travaillez vos annonces avec votre infographe et importez les simplement pour les remettre à la régie de Google."
    },
    secondary: {
      icon: 'web',
      title: 'Annonces avec des visuels',
      description: "Travaillez vos annonces avec votre infographe et importez les simplement pour les remettre à la régie de Google."
    }
  },
  {
    obj_id: 'native',
    primary: {
      icon: 'assets/gif/rsda.gif',
      title: "Pas d'infographies ? Optez pour le responsive display",
      description: "Une importation simple de votre logo et d'images et une adaptation automatique aux formats de Google nécessaires à votre diffusion. Il est possible également de rechercher des images à partir d'un site web;"
    },
    secondary: {
      icon: 'web',
      title: "Pas d'infographies ? Optez pour le responsive display",
      description: "Une importation simple de votre logo et d'images et une adaptation automatique aux formats de Google nécessaires à votre diffusion. Il est possible également de rechercher des images à partir d'un site web;"
    }
  },
]

/*
  Facebook interfaces and data set
*/

export const CAMPAIGN_STATUS = {
  ACTIVE: {
    name: 'Active',
    apiName: 'ACTIVE'
  },
  PAUSED: {
    name: 'Paused',
    apiName: 'PAUSED'
  },
  DELETED: {
    name: 'Deleted',
    apiName: 'DELETED'
  },
  ARCHIVED: {
    name: 'Archived',
    apiName: 'ARCHIVED'
  }
}

export interface FB_OBJECTIVE_FORMAT {
    obj_id: string,
    icon: string,
    name: string,
    apiName: string,
    description: string
} 

export interface FB_OBJECTIVE {
  type : FB_OBJECTIVE_FORMAT,
  options : FB_OBJECTIVE_FORMAT[]
}

export interface  AD_CATEGORIES {
  id?: string,
  icon?: string,
  name: string,
  apiName: string,
  description: string
}

export interface PLACEMENTS {
  id: number,
  tag: string,
  parentTag?: string,
  name: string,
  apiName: string,
  description?: string,
  checked: boolean,
  isClosed?: boolean,
  options?: PLACEMENTS[]
}

export const FB_OBJECTIVES_DATA: FB_OBJECTIVE[] = [
  {
    type: {
      obj_id: '1',
      icon: 'campaign',
      name: 'Awareness',
      apiName: 'AWARENESS',
      description: 'Awareness'
    },
    options: [
      {
        obj_id: '1_1',
        icon: 'campaign',
        name: 'Brand Awareness',
        apiName: 'BRAND_AWARENESS',
        description: 'Show your ads to people who are most likely to remember them.'
      },
      {
        obj_id: '1_2',
        icon: 'campaign',
        name: 'Reach',
        apiName: 'REACH',
        description: 'Show your ads to the maximum number of people.'
      }
    ]
  },
  {
    type: {
      obj_id: '2',
      icon: 'ads_click',
      name: 'Consideration',
      apiName: 'CONSIDERATION',
      description: 'Consideration'
    },
    options: [
      {
        obj_id: '2_1',
        icon: 'ads_click',
        name: 'Traffic',
        apiName: 'TRAFFIC',
        description: 'Send people to a destination, such as a website, app, Facebook event or Messenger conversation.'
      },
      {
        obj_id: '2_2',
        icon: 'question_answer',
        name: 'Egagement',
        apiName: 'ENGAGEMENT',
        description: 'Get more Page likes, event responses, or post reacts, comments or shares.'
      },
      {
        obj_id: '2_3',
        icon: 'get_app',
        name: 'App Installs',
        apiName: 'APP_INSTALLS',
        description: 'Show your ad to people who are most likely to download and engage with your app'
      },
      {
        obj_id: '2_4',
        icon: 'video_camera_back',
        name: 'Video Views',
        apiName: 'VIDEO_VIEWS',
        description: 'Show people video ads.'
      },
      {
        obj_id: '2_5',
        icon: 'highlight',
        name: 'Lead Generation',
        apiName: 'LEAD_GENERATION',
        description: 'Collect leads for your business or brand.'
      },
      {
        obj_id: '2_6',
        icon: 'question_answer',
        name: 'Messages',
        apiName: 'MESSAGES',
        description: 'Show people ads that allow them to engage with you on Messenger, WhatsApp or Instagram Direct.'
      }
    ]
  },
  {
    type: {
      obj_id: '3',
      icon: 'language',
      name: 'Conversion',
      apiName: 'CONVERSION',
      description: 'Conversion'
    },
    options: [
      {
        obj_id: '3_1',
        icon: 'language',
        name: 'Conversions',
        apiName: 'CONVERSIONS',
        description: 'Show your ads to people who are most likely to take valuable actions, such as making a purchase or adding payment info, on your website, app or in Messenger.'
      },
      {
        obj_id: '3_2',
        icon: 'shopping_cart',
        name: 'Catalogue Sales',
        apiName: 'CATALOGUE SALES',
        description: 'Use your target audience to show people ads with items from your catalogue.'
      },
      {
        obj_id: '3_3',
        icon: 'store',
        name: 'Store Traffic',
        apiName: 'STORE_TRAFFIC',
        description: "Show your ad to people most likely to visit your physical stores when they're near them."
      }
    ]
  }
]

export const SPECIAL_AD_CATEGORIES: AD_CATEGORIES[] = [
  {
    id: "credit", 
    icon: "credit_card",
    name: "Credit",
    apiName: "CREDIT",
    description: "Ads for credit card offers, vehicle loans, long-term financing or other related opportunities."
  },
  {
    id: "employment", 
    icon: "work",
    name: "Employment",
    apiName: "EMPLOYMENT",
    description: "Ads for job offers, internships, professional certification programmes or other related opportunities."
  },
  {
    id: "housing", 
    icon: "house",
    name: "Housing",
    apiName: "HOUSING",
    description: "Ads for property listings, home insurance, mortgages or other related opportunities."
  },
  {
    id: 'social_politics',
    icon: 'campaign',
    name: 'Social issues, elections or politics',
    apiName: "ISSUES_ELECTIONS_POLITICS",
    description: 'Ads about social issues (such as the economy, or civil and social rights), elections, or political figures or campaigns'
  }
]

export const GENDERS_LIST = [
  {
    id: 0,
    name: "All",
    selected: true
  },
  {
    id: 1,
    name: "Men",
    selected: false
  },
  {
    id: 2,
    name: "Women",
    selected: false
  }
]

export const AD_PLACEMENTS: PLACEMENTS[] = [
  {
    id: 1,
    tag: "feed",
    name: "Feeds",
    apiName: "",
    description: "Get high visibility for your business with ads in feeds",
    checked: false,
    isClosed: false,
    options: [
      {
        id: 1,
        tag: "fb",
        parentTag: "feed",
        name: "Facebook News Feed",
        apiName: "feed",
        checked: false,
      },
      {
        id: 2,
        tag: "fb",
        parentTag: "feed",
        name: "Facebook Marketplace",
        apiName: "marketplace",
        checked: false
      },
      {
        id: 3,
        tag: "fb",
        parentTag: "feed",
        name: "Facebook video feeds",
        apiName: "video_feeds",
        checked: false
      },
      // {
      //   id: 4,
      //   tag: "fb",
      //   parentTag: "feed",
      //   name: "Facebook right column",
        // apiName: "right_hand_column",
      //   checked: false
      // },
       {
        id: 5,
        tag: "ig",
        parentTag: "feed",
        name: "Instagram Explore",
        apiName: "explore",
        checked: false
      }
    ]
  },
  {
    id: 2,
    tag: "story",
    name: "Stories and Reels",
    apiName: "",
    description: "Tell a rich, visual story with immersive, full-screen vertical ads",
    checked: false,
    isClosed: false,
    options: [
      {
        id: 1,
        tag: "ig",
        parentTag: "story",
        name: "Instagram Stories",
        apiName: "story",
        checked: false,
      },
      {
        id: 2,
        tag: "fb",
        parentTag: "story",
        name: "Facebook Stories",
        apiName: "story",
        checked: false,
      },
      // {
      //   id: 3,
      //   tag: "ig",
      //   parentTag: "story",
      //   name: "Instagram Reels",
      //   apiName: "",
      //   checked: false,
      // }
    ]
  },
  // {
  //   id: 3,
  //   tag: "stream",
  //   name: "In-stream",
  //   apiName: "",
  //   description: "Quickly capture peoples attention while theyre watching videos",
  //   checked: false,
  //   isClosed: false,
  //   options: [
  //     {
  //       id: 1,
  //       tag: "fb",
  //       parentTag: "stream",
  //       name: "Facebook in-stream videos",
  //       apiName: "",
  //       checked: false,
  //     },
  //     {
  //       id: 2,
  //       tag: "ig",
  //       parentTag: "stream",
  //       name: "Instagram IGTV",
  //       apiName: "stream",
  //       checked: false,
  //     }
  //   ]
  // },
   {
    id: 4,
    tag: "search",
    name: "Search",
    apiName: "",
    description: "Get visibility for your business as people search on Facebook",
    checked: false,
    isClosed: false,
    options: [
      {
        id: 1,
        tag: "fb",
        parentTag: "search",
        name: "Facebook search results",
        apiName: "search",
        checked: false,
      }
    ]
  },
  {
    id: 5,
    tag: "article",
    name: "In-article",
    apiName: "",
    description: "Engage with people who are reading content from publishers",
    checked: false,
    isClosed: false,
    options: [
      {
        id: 1,
        tag: "fb",
        parentTag: "article",
        name: "Facebook Instant articles",
        apiName: "instant_article",
        checked: false
      }
    ]
  }
]

export const OPTIMIZATION_GOAL: any = [
  // {
  //   id: 1,
  //   name: 'None',
  //   apiName: "NONE",
  //   description: "Only available in read mode for campaigns created pre v2.4."
  // },
  // {
  //   id: 2,
  //   name: 'App Installs',
  //   apiName: "APP_INSTALLS",
  //   description: "Optimize for people more likely to install your app."
  // },
  {
    id: 3,
    name: 'Ad recall lift',
    apiName: "AD_RECALL_LIFT",
    description: "Optimize for people more likely to remember seeing your ads."
  },
  // {
  //   id: 4,
  //   name: 'Engaged users',
  //   apiName: "ENGAGED_USERS",
  //   description: "Optimize for people more likely to take a particular action in your app."
  // },
  // {
  //   id: 5,
  //   name: 'Event responses',
  //   apiName: "EVENT_RESPONSES",
  //   description: "Optimize for people more likely to attend your event."
  // },
  // {
  //   id: 6,
  //   name: 'None',
  //   apiName: "IMPRESSIONS",
  //   description: "Show the ads as many times as possible."
  // },
  // {
  //   id: 7,
  //   name: 'Lead generation',
  //   apiName: "LEAD_GENERATION",
  //   description: "Optimize for people more likely to fill out a lead generation form."
  // },
  // {
  //   id: 8,
  //   name: 'Link clicks',
  //   apiName: "LINK_CLICKS",
  //   description: "Optimize for people more likely to click in the link of the ad."
  // },
  // {
  //   id: 9,
  //   name: 'Offer claims',
  //   apiName: "OFFER_CLAIMS",
  //   description: "Optimize for people more likely to claim the offer."
  // },
  // {
  //   id: 10,
  //   name: 'Offsite conversions',
  //   apiName: "OFFSITE_CONVERSIONS",
  //   description: "Optimize for people more likely to make a conversion in the site"
  // },
  // {
  //   id: 11,
  //   name: 'Page engagement',
  //   apiName: "PAGE_ENGAGEMENT",
  //   description: "Optimize for people more likely to engage with your page."
  // },
  // {
  //   id: 12,
  //   name: 'Page likes',
  //   apiName: "PAGE_LIKES",
  //   description: "Optimize for people more likely to like your page."
  // },
  // {
  //   id: 13,
  //   name: 'Post engagement',
  //   apiName: "POST_ENGAGEMENT",
  //   description: "Optimize for people more likely to engage with your post."
  // },
  // {
  //   id: 14,
  //   name: 'Reacg',
  //   apiName: "REACH",
  //   description: "Optimize to reach the most unique users of each day or interval specified in frequency control specs."
  // },
  // {
  //   id: 15,
  //   name: 'Social impressions',
  //   apiName: "SOCIAL_IMPRESSIONS",
  //   description: " Increase the number of impressions with social context."
  // },
  // {
  //   id: 16,
  //   name: 'Value',
  //   apiName: "VALUE",
  //   description: "Optimize for maximum total purchase value within the specified attribution window."
  // },
  // {
  //   id: 17,
  //   name: 'Thruplay',
  //   apiName: "THRUPLAY",
  //   description: "Optimize delivery of your ads to people who are more likely to play your ad to completion, or play it for at least 15 seconds."
  // },
  // {
  //   id: 18,
  //   name: 'Replies',
  //   apiName: "REPLIES",
  //   description: "Directs ads to people more likely to have a conversation with the business."
  // },
  // {
  //   id: 19,
  //   name: 'Derived events',
  //   apiName: "DERIVED_EVENTS",
  //   description: "Optimize for retention, which reaches people who are most likely to return to the app and open it again during a given time frame after installing. "
  // },
  // {
  //   id: 20,
  //   name: 'Visit instagram profile',
  //   apiName: "VISIT_INSTAGRAM_PROFILE",
  //   description: "Optimize for visits to the advertiser's instagram profile."
  // }
]

export const BILLING_EVENT: any = [
  // {
  //   id: 1,
  //   name: 'App installs',
  //   apiName: "APP_INSTALLS",
  //   description: "Pay when people install your app."
  // },
  {
    id: 2,
    name: 'Impressions',
    apiName: "IMPRESSIONS",
    description: "Pay when the ads are shown to people."
  },
  // {
  //   id: 3,
  //   name: 'Link clicks',
  //   apiName: "LINK_CLICKS",
  //   description: "Pay when people click on the link of the ad."
  // },
  // {
  //   id: 4,
  //   name: 'Offer claims',
  //   apiName: "OFFER_CLAIMS",
  //   description: "Pay when people claim the offer."
  // },
  // {
  //   id: 5,
  //   name: 'Page likes',
  //   apiName: "PAGE_LIKES",
  //   description: "Pay when people like your page."
  // },
  // {
  //   id: 6,
  //   name: 'Post engagement',
  //   apiName: "POST_ENGAGEMENT",
  //   description: "Pay when people engage with your post."
  // },
  // {
  //   id: 7,
  //   name: 'Video views',
  //   apiName: "VIDEO_VIEWS",
  //   description: "Pay when people watch your video ads for at least 10 seconds."
  // },
  // {
  //   id: 8,
  //   name: 'Thruplay',
  //   apiName: "THRUPLAY",
  //   description: "Pay for ads that are played to completion, or played for at least 15 seconds."
  // }
]

export const Range_Fr_Values: Range_Selector_Type[] = [
  {
    id: 1,
    rangeText: 'Hier',
    rangeValue: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  },
  {
    id: 2,
    rangeText: "Aujourd'hui",
    rangeValue: [moment(), moment()],
  },
  {
    id: 3,
    rangeText: '7 derniers jours',
    rangeValue: [moment().subtract(7, 'days'),moment()],
  },
  {
    id: 4,
    rangeText: '14 derniers jours',
    rangeValue: [moment().subtract(14, 'days'),moment()],
  },
  {
    id: 5,
    rangeText: '30 derniers jours',
    rangeValue: [moment().subtract(30, 'days'),moment()],
  },
  {
    id: 6,
    rangeText: 'Cette semaine',
    rangeValue: [moment().startOf('week'), moment().endOf('week')],
  },
  {
    id: 7,
    rangeText: 'Semaine dernière',
    rangeValue: [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
  },
  
  {
    id: 8,
    rangeText: 'Ce mois-ci',
    rangeValue: [moment().startOf('month'), moment().endOf('month')],
  },
  {
    id: 9,
    rangeText: 'Le dernier mois',
    rangeValue: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  },
  {
    id: 10,
    rangeText: 'Personnaliser',
    rangeValue: [moment(),moment()],
  }
]

export const rangesSelectorFr: any = {
  "Aujourd'hui": [moment(), moment()],
  'Hier': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Cette semaine': [moment().startOf('week'), moment().endOf('week')],
  "Semaine dernière": [moment().startOf('week').subtract(1, "week"),moment().startOf('week').subtract(1, "day")],
  '30 derniers jours': [moment().subtract(29, 'days'), moment()],
  'Ce mois': [moment().startOf('month'), moment().endOf('month')],
  'Mois dernier': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  'Personnaliser': [moment(),moment()],

};


export interface Range_Selector_Type{
  id?: number;
  rangeText?: string;
  rangeValue?: Moment[]
}
export const Range_En_Values: Range_Selector_Type[] = [
  {
    id: 1,
    rangeText: 'Yesterday',
    rangeValue: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  },
  {
    id: 2,
    rangeText: 'Today',
    rangeValue: [moment(), moment()],
  },
  {
    id: 3,
    rangeText: 'Last 7 days',
    rangeValue: [moment().subtract(7, 'days'),moment()],
  },
  {
    id: 4,
    rangeText: 'Last 14 days',
    rangeValue: [moment().subtract(14, 'days'),moment()],
  },
  {
    id: 5,
    rangeText: 'Last 30 days',
    rangeValue: [moment().subtract(30, 'days'),moment()],
  },
  {
    id: 6,
    rangeText: 'This week',
    rangeValue: [moment().startOf('week'), moment().endOf('week')],
  },
  {
    id: 7,
    rangeText: 'Last week',
    rangeValue: [moment().subtract(1,'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
  },
  
  {
    id: 8,
    rangeText: 'This month',
    rangeValue: [moment().startOf('month'), moment().endOf('month')],
  },
  {
    id: 9,
    rangeText: 'Last month',
    rangeValue: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  },
  {
    id: 10,
    rangeText: 'Custom range',
    rangeValue: [moment(),moment()],
  }
]
export const rangesSelectorEn: any = {
  "Today": [moment(), moment()],
  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'This week': [moment().startOf('week'), moment().endOf('week')],
  "Last week": [moment().startOf('week').subtract(1, "week"),moment().startOf('week').subtract(1, "day")],
  'Last 30 days': [moment().subtract(29, 'days'), moment()],
  'This month': [moment().startOf('month'), moment().endOf('month')],
  'Last month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
  'Custom': [moment(),moment()],

};

export interface Selected_Date_Range{
  rangeId: number,
  startDate: Moment,
  endDate: Moment,
  startDateFormattedGoogle: string,
  endDateFormattedGoogle: string,
  dateRangeText: string,
}

export interface AdToDelete{
  id?: string;
  ad_id?: number;
  ad_group_id?: number
}
export const DATE_OPTIONS_WITH_FULL_TIME = {
        day : '2-digit',
	      month : 'long',
        year: 'numeric',
        timeZoneName: "short",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
}

export interface CPRC{
  id?: string;
  clicks?: string;
  costs?: string;
  impressions?: string;
  date?: string;
  campaign?: string;
  interactions?: any;
  interactionTypes?: any;
  interactionRate?: any;
  conversions?: any;
  ctr?: any;
  convRate?: any;
  percentNewVisitors?: any;
  activeViewViewability?: any;
  activeViewMeasurableImpressions?: string;
  activeViewImpressions?: string;
  activeViewMeasurableCost?: string;
  client_customer_id?: string;
}



export interface GEO_TARGET_RESPONSE{
  campaign_id?: string;
  cityID?: string;
  countryID?:string,
  regionID?: string,
  clicks?: string;
  costs?: string;
  impressions?: string;
  date?: string;
  campaignName?: string;
  interactions?: any;
  interactionTypes?: any;
  interactionRate?: any;
  conversions?: any;
  ctr?: any;
  convRate?: any;
  client_customer_id?: string;
  locationName?: string
}

export interface AGE_RANGE_REPORT{
  campaign_id?: string;
  criteria?: string;
  criterionId?:string,
  clicks?: string;
  costs?: string;
  impressions?: string;
  date?: string;
  campaignName?: string;
  interactions?: any;
  interactionTypes?: any;
  interactionRate?: any;
  conversions?: any;
  ctr?: any;
  convRate?: any;
  client_customer_id?: string;
}

export interface GENDERS_REPORT{
  campaign_id?: string;
  criteria?: string;
  criterionId?:string,
  clicks?: string;
  costs?: string;
  impressions?: string;
  date?: string;
  campaignName?: string;
  interactions?: any;
  interactionTypes?: any;
  interactionRate?: any;
  conversions?: any;
  ctr?: any;
  convRate?: any;
  client_customer_id?: string;
}

export interface GEO_REPORT_SAMPLE{
  fields:{
    pays?: string,
    clicks?: number,
    costs?: number,
    impressions: number

  }
}

export interface AGE_REPORT_SAMPLE{
  fields:{
    criteria?: string,
    clicks?: number,
    costs?: number,
    impressions: number

  }
}
export interface GENDERS_REPORT_SAMPLE{
  fields:{
    criteria?: string,
    clicks?: number,
    costs?: number,
    impressions: number

  }
}

export interface GEO_TARGET_MODEL_COLLECTION_FOR_REPORT{
  id: string,
  registeredTime: string;
  clicks: any;
  costs: any;
  impressions: any;
  allData: GEO_TARGET_RESPONSE[];
  reportField: GEO_REPORT_SAMPLE[];
}

export interface AGE_RANGE_MODEL_COLLECTION_FOR_REPORT{
  id: string,
  registeredTime: string;
  clicks: any;
  costs: any;
  impressions: any;
  allData: AGE_RANGE_REPORT[];
  reportField: AGE_REPORT_SAMPLE[];
}

export interface GENDERS_MODEL_COLLECTION_FOR_REPORT{
  id: string,
  registeredTime: string;
  clicks: any;
  costs: any;
  impressions: any;
  allData: GENDERS_REPORT[];
  reportField: GENDERS_REPORT_SAMPLE[];
}
export interface LinkedUser{
  user?: User
  role?: User_Role
  linkDate?: number;
}

export interface Linked_ADAFRI_ACCOUNT{
  account?: Account
  role?: User_Role;
}

export interface Link{
  id?: string;
  status?: string;
  owner?: string;
  owner_email?: string;
  target?: string;
  target_email?: string;
  linkDate?: number;
  linkDateString?: string;
  linked_account?: Linked_ADAFRI_ACCOUNT;
}

export class Notifications_Accounts_Link{
    id?: string;
    owner?: string;
    content?: string;
    link?: Link;
    createdAt?: any;
    isArchived?: boolean;
    isRead?: boolean
  
}

export interface Account{
  id?: string;
  name?: string;
  status?: string;
  owner?: string;
  owner_email?: string;
  creationDate?: number;
  creationDateString?: string;
  account_value?: number;
  totalClics?: number;
  totalCosts?: number;
  totalImpressions?: number;
  usedPackTest?: boolean;
  first_client_customer_id?: number;
  second_client_customer_id?: number;
  provider?: {iv: string, content: string};
   

}
export interface BIZAO_TOKEN_RESPONSE {
  access_token: string,
  scope: string,
  token_type: string,
  expires_in: number
}

export interface BIZAO_CARD_RESPONSE{
  
  status?: number;
  message?: string;
  pay_token?:string;
  payment_url?: string,
  notif_token?: string;
  state: string;
  provider?: string;
  order_id?:string;
  }

export interface User {
  uid: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  photoURL?: string;
  displayName?: string;
  account_value?: number;
  paymentKey?: string;
  entrepriseName?: string;
  addresse?: string;
  telephone?: string;
  postal?: string;
  isConnectWithMailAndPassword?: boolean;
  user_type?: string;
  hasApprouvedPolicy?: boolean;
  auth_code?: string;
  credentials?: CREDENTIALS_AUTH_FLOW[];
  accounts?: any;
  linkedAccounts?: any;
  authorizedPush?: boolean;
  invitedAccounts?: Linked_ADAFRI_ACCOUNT[];
  ownedAccounts?: Account[];
  token?: any;
  isCorporate?: boolean;
  isParticular?: boolean;
  entrepriseUrl?: string;
  profileCompleted?: boolean;
  deviceInfo?: DeviceInfo;
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktopDevice?: boolean;
  phoneInfo?: {
    number:string,
    internationalNumber:string,
    nationalNumber: string,
    e164Number: string,
    countryCode: string,
    dialCode: string;

  }
  country?: Country;
  countryISO?: CountryISO;



}

export interface KEYWORDS_TYPE{

}

export interface User_Role{
  admin?: boolean;
  readOnly?: boolean;
}

export interface NATIVE_ADS {
    id?: string,
    titles?: ASSET_TEXT[],
    descriptions?: ASSET_TEXT[],
    brand?: ASSET_TEXT,
    imagesRectangle?: ImageBase64[];
    imagesSquare?: ImageBase64[];
    imagesLogo?: ImageBase64[];
    videosAssets?: YOUTUBE_VIDEOS_INTERFACE[]
  
}

export interface SEARCH_ADS {
  id?: string,
  titles?: ASSET_TEXT[],
  descriptions?: ASSET_TEXT[],
  visibleUrl?: string,
  finalURL?: string,
  visibleUrlDomain?: string,
  path1?: string,
  path2?: string,
}


export interface PHONE_TYPE{
  feedId: number,
  feedItemId: number,
  status:  string,
  feedType?: string,
  internationalNumber: string, 
  phoneInfo?: {
      countryCode?: string;
      dialCode?: string;
      e164Number?:string;
      internationalNumber?: string;
      nationalNumber?: string;
      number?: string
  }, 
  country?: Country
}
export interface IMAGES_UPLOAD_AS_ASSET{
  data: string;
  useFor: string;
  usage: string;
  originalImageInfo: ImageBase64;
  owner: string;
  aacid: string;
}

export interface ASSETS_NATIVE{
  id?: string;
  assetId?: number;
  width?: number;
  height?: number;
  imageUrl?: string;
  imageFileSize?: number;
  imageMimeType?: string;
  usage?: string;
  useFor?: string;
  owner?: string;
  aacid?: string;
}
export interface WEBSITE {
id?: string; 
url?: string
criterionId?: number;
criterionType?: string;
auth?: string;
hash?: string;
host?: string;
hostname?: string;
href?: string;
origin?: string;
password?: string;
pathname?: string;
port?: string;
protocol?: string;
query?: { [key: string]: string | undefined };
slashes?: boolean;
  username?: string;
  
}

export interface URL_PARSER{
hash?: string;
host?: string;
hostname?: string;
href?: string;
origin?: string;
password?: string;
pathname?: string;
port?: string;
protocol?: string;
query?: { [key: string]: string | undefined };
slashes?: boolean;
username?: string;
}

export interface adDispalyError{
  id?: string,
  policyName?: string,
  policyDescription?: string,
  reason?: string,
  fieldError?: string,
  operation: any,
}


export interface RESPONSIVE_DISPLAY_ADS_WITHOUT_OWNER{
  ad_id: number;
  status?: string;
  adData?: NATIVE_ADS_TO_PUBLISH;
  headlines?: TEXT_ASSET[];
  longHeadline?: TEXT_ASSET;
  descriptions?: TEXT_ASSET[];
  businessName?: string;
  youTubeVideos?: YOUTUBE_VIDEO_ASSET[];
  marketingImages?: IMAGES_ASSET[];
  squareMarketingImage?: IMAGES_ASSET[];
  logoImages?: IMAGES_ASSET[];
  landscapeLogoImages?: IMAGES_ASSET[];
}


export interface ASSETS_NATIVE_UPLOADED{
  id?: string;
  assetId?: number;
  width?: number;
  height?: number;
  imageUrl?: string;
  imageFileSize?: number;
  imageMimeType?: string;
  originalImageInfo?: ImageBase64;
  usage?: string;
  useFor?: string;
  owner?: string;
  aacid?: string;
}

export interface NATIVE_ADS_BEFORE_UPLOAD{
    id?: string,
    titles?: ASSET_TEXT[],
  descriptions?: ASSET_TEXT[],
  longHeadline?: ASSET_TEXT,
    brand?: ASSET_TEXT,
    images?: ImageBase64[],
    videosAssets?: VIDEO_ASSET[],
  uploadedAssets?: ASSETS_NATIVE_UPLOADED[]
}
export interface SEARCH_ADS_BEFORE_UPLOAD{
  id?: string,
  titles?: ASSET_TEXT[],
  descriptions?: ASSET_TEXT[],
  visibleUrl?: string,
  finalURL?: string,
  visibleUrlDomain?: string,
  path1?: string,
  path2?: string,
}

export interface NATIVE_ADS_TO_PUBLISH{
    id?: string,
    titles?: ASSET_TEXT[],
    descriptions?: ASSET_TEXT[],
    longHeadline?: ASSET_TEXT,
    brand?: ASSET_TEXT,
    videosAssets?: VIDEO_ASSET[],
    marketingImages?: ASSETS_NATIVE[],
    squareMarketingImages?: ASSETS_NATIVE[],
    logoImages?: ASSETS_NATIVE[],
    landscapeLogoImages?: ASSETS_NATIVE[]
}

export interface Native_While_Publish{
  adData?: NATIVE_ADS_TO_PUBLISH;
  requireLogo?: boolean;
  requireLandscapeLogo?: boolean;

}

export interface YOUTUBE_VIDEO_ASSET{
  assetId?: number;
  assetName?: string;
  assetSubtype?: string;
  youTubeVideoId?: string;
}

export interface TEXT_ASSET{
  assetId?: number;
  assetName?: any;
  assetSubtype?: string;
  assetText?: string;
}

export interface IMAGES_ASSET{
  assetId?: number;
  assetName?: string;
  assetSubtype?: string;
  assetText?: string;
  imageFileSize?: number;
  imageMimeType?: string;
  fullSizeInfo?:{
    imageHeight?: number;
    imageWidth?: number;
    imageUrl?: string;
  }
}

export interface RESPONSIVE_DISPLAY_ADS{
  id?: string;
  ad_id?: number;
  status?: string;
  adData?: NATIVE_ADS_TO_PUBLISH;
  headlines?: TEXT_ASSET[];
  longHeadline?: TEXT_ASSET;
  descriptions?: TEXT_ASSET[];
  businessName?: string;
  youTubeVideos?: YOUTUBE_VIDEO_ASSET[];
  marketingImages?: IMAGES_ASSET[];
  squareMarketingImage?: IMAGES_ASSET[];
  logoImages?: IMAGES_ASSET[];
  landscapeLogoImages?: IMAGES_ASSET[];
  createdAt?: any;
  createdBy?: any;
  ad_group_id?: number;
  accountId?: string;
  owner?: string;

}



export interface ImageBase64{
  id?: string;
  width?: number;
  height?: number;
  url?: string;
  images?: {
    imageRect?: {
      urlString: string,
      canvas: any,
      box: any,
      imageData: any
    };
    imageSqr?: {
      urlString: string,
      canvas: any,
      box: any,
      imageData: any
    };
  }
  usage: string,

}
export interface DISPLAY_ADS {
    id?: string;
    name?: string;
    mediaId?: string;
    type?: string;
    referenceId?: number;
    urls?: any;
    mimeType?: any;
    width?: number;
    height?: number;
  
}

export interface DISPLAY_ADS_ASSETS {
    id?: string;
    name?: string;
    mediaId?: string;
    type?: string;
    referenceId?: number;
    urls?: any;
    mimeType?: any;
    width?: number;
  height?: number;
  accountId?: string;
  
}



export interface Assets {
    id?: string;
    name?: string;
    mediaId?: number;
    type?: string;
    referenceId?: number;
    urls?: any;
    mimeType?: any;
    width?: number;
    height?: number;
    parentId?: number;
    usedForRectangle?: boolean;
    usedForSquare?: boolean;
    usedForLogo?: boolean;
    owner?: string;
  
}

export interface NATIVE_ADS_IMAGES {
    temporaryId?: string;
  imagesRectangle?: ImageCropped[];
  imagesSquare?: ImageCropped[];
  imagesLogo?: ImageCropped[]
  
}

export interface ImageCropped{
  imageRectangle?: ImgCropperEvent,
    imageSquare?: ImgCropperEvent,
    imageLogo?: LOGO_IMAGE,
    
}

export interface CroppedAsset{
    type?: string;
    asset?: Assets
}

export interface LOGO_IMAGE{
    imageRectangle?: ImgCropperEvent
    imageSquare?: ImgCropperEvent
}

export interface AssetToUse{
    id?: number;
    parentId?: number;
    type?: string;
    data?: Assets;
}

export interface YOUTUBE_CHANNELS_INTERFACE{
  id?: string;
  channelId?: string;
  name?: string;
  snippet?: string;
  thumbnails?: string;
}

export interface YOUTUBE_VIDEOS_INTERFACE{
  id?: string;
  videoId?: string;
  name?: string;
  snippet?: string;
  thumbnails?: string;
}

export interface VIDEO_ASSET{
  id?: string;
  videoId?: string;
  name?: string;
  snippet?: string;
  thumbnails?: string;
  previewUrl?: string;
  accountId?: string;
}

export interface YOUTUBE_SEARCH_INTERFACE{
  channels: YOUTUBE_CHANNELS_INTERFACE[];
  videos: YOUTUBE_VIDEOS_INTERFACE[];
}

export interface LOCATION{
   id?: number;
   locationName?: string;
   displayType?: string;
   targetingStatus?: string;
   reach?: number;
  canonicalName?: string;
   criterionId?: number;
}


export interface PLACEMENT_TYPE{
  url?: string;
  criterionId?: number;
  criterionType?: string;
}


export interface AGES_TYPE{
  text?: string
  ageRangeType?: string;
  criterionId?: number;
  citerionType?: string;
  type?: string;
}

export interface GENDERS_TYPE{
  text?: string
  gendersRangeType?: string;
  criterionId?: number;
  citerionType?: string;
  type?: string;
}

export interface ADS_SCHEDULE{
  data?: SCHEDULE_INTERFACE;
  criterionId?: number;
  criterionType?: string
}

export interface MapMarker{
  location: LOCATION;
  lat: number;
  lng: number;
  iconUrl?: string;
}

export interface AD_FORMAT {
  id?: string;
  name?: string;
  isSpecial?: boolean;
  img?: string;
  width?: number;
  height?: number;

}

/* export const adFormat = () => [
 { name: "Rectangle (300x250)",  id: "MediumRectangle", isSpecial: true, img: "https://dummyimage.com/300x250/000/fff", width: 300, height: 250,},
 { name: "Rectangle Large (336x280)", id: "LargeRectangle", isSpecial: true, img: "https://dummyimage.com/336x280/000/fff", width: 336, height: 280},
 { name: "Carré (250x250)", width: 250, height: 250, id: "Square", isSpecial: true, img: "https://dummyimage.com/250x250/000/fff" },
 { name: "Vertical Medium (160x600)", width: 160, height: 600, id: "Wideskyscraper", isSpecial: true, img: "https://dummyimage.com/160x600/000/fff" },
 { name: "Demi page (300x600)", width: 300, height: 600, id: "LargeSkyscraper", isSpecial: true, img: "https://dummyimage.com/300x600/000/fff" },
 { name: "Horizontal Medium (728x90)", width: 728, height: 90" id: "Leaderboard", isSpecial: true, img: "https://dummyimage.com/728x90/000/fff" },
 { name: "Horizontal (468x60)", width: 468, height: 60" id: "Banner", isSpecial: false, img: "https://dummyimage.com/468x60/000/fff" },
 { name: "Vertical (120x600)", width: 120, height: 600, id: "Skyscraper", isSpecial: false, img: "https://dummyimage.com/120x600/000/fff" },
 { name: "Rectangle Vertical (240x400)", width: 240, height: 400, id: "RV", isSpecial: false, img: "https://dummyimage.com/120x600/000/fff" },
 { name: "Horizontal Large (970x90)", width: 970, height: 90" id: "LargerLeaderboard", isSpecial: false, img: "https://dummyimage.com/970x90/000/fff" },
 { name: "Big Panneau (970x250)", width: 970, height: 250, id: "BigPanneau", isSpecial: false, img: "https://dummyimage.com/970x250/000/fff" },
 { name: "Petit carré (200x200)",width: 200, height: 200, id: "Smallsquare", isSpecial: false, img: "https://dummyimage.com/200x100/000/fff" }
] */

export const VALID_AD_FORMAT_DISPLAY: AD_FORMAT[] = [
  { name: "Rectangle (300x250)",  id: "MediumRectangle", isSpecial: true, img: "https://dummyimage.com/300x250/000/fff",  width : 300, height: 250},
 { name: "Rectangle Large (336x280)", id: "LargeRectangle", isSpecial: true, img: "https://dummyimage.com/336x280/000/fff", width: 336, height: 280},
 { name: "Carré (250x250)", width: 250, height: 250, id: "Square", isSpecial: true, img: "https://dummyimage.com/250x250/000/fff" },
 { name: "Vertical Medium (160x600)", width: 160, height: 600, id: "Wideskyscraper", isSpecial: true, img: "https://dummyimage.com/160x600/000/fff" },
 { name: "Demi page (300x600)", width: 300, height: 600, id: "LargeSkyscraper", isSpecial: true, img: "https://dummyimage.com/300x600/000/fff" },
 { name: "Horizontal Medium (728x90)", width: 728, height: 90, id: "Leaderboard", isSpecial: true, img: "https://dummyimage.com/728x90/000/fff" },
 { name: "Horizontal (468x60)", width: 468, height: 60, id: "Banner", isSpecial: false, img: "https://dummyimage.com/468x60/000/fff" },
 { name: "Vertical (120x600)", width: 120, height: 600, id: "Skyscraper", isSpecial: false, img: "https://dummyimage.com/120x600/000/fff" },
 { name: "Rectangle Vertical (240x400)", width: 240, height: 400, id: "RV", isSpecial: false, img: "https://dummyimage.com/120x600/000/fff" },
 { name: "Horizontal Large (970x90)", width: 970, height: 90, id: "LargerLeaderboard", isSpecial: false, img: "https://dummyimage.com/970x90/000/fff" },
 { name: "Big Panneau (970x250)", width: 970, height: 250, id: "BigPanneau", isSpecial: false, img: "https://dummyimage.com/970x250/000/fff" },
 { name: "Petit carré (200x200)",width: 200, height: 200, id: "Smallsquare", isSpecial: false, img: "https://dummyimage.com/200x100/000/fff" },
 { name: "Not allowed (1280x720)",width: 1280, height: 720, id: "Smallsquare", isSpecial: false, img: "https://dummyimage.com/1280x720/000/fff" }
]


export const VALID_AD_FORMAT_YOUTUBE: AD_FORMAT[] = [
  { name: "Rectangle (300x250)",  id: "MediumRectangle", isSpecial: true, img: "https://dummyimage.com/300x250/000/fff",  width : 300, height: 250},
  { name: "Demi page (300x600)", width: 300, height: 600, id: "LargeSkyscraper", isSpecial: true, img: "https://dummyimage.com/300x600/000/fff" },
 { name: "Horizontal Medium (728x90)", width: 728, height: 90, id: "Leaderboard", isSpecial: true, img: "https://dummyimage.com/728x90/000/fff" },
  { name: "Horizontal (468x60)", width: 468, height: 60, id: "Banner", isSpecial: false, img: "https://dummyimage.com/468x60/000/fff" },
]

export const adYoutube = () => [
 { name: "Horizontal Medium (728x90)", width: 728, height: 90, id: "Leaderboard", isSpecial: true, img: "https://dummyimage.com/728x90/000/fff" },
 { name: "Horizontal (468x60)", width: 468, height: 60, id: "Banner", isSpecial: false, img: "https://dummyimage.com/468x60/000/fff" }
]


 export const youtubeChannels = () =>
 [
      { id: "UCqe0sSESmaQbLFdTExctQLA", name: "Marodi TV Sénégal" },
      { id: "UC5NQ49FVRIAuWE1el6L2gkg", name: "TFM (Télé Futurs Medias)"},
      { id: "UCJR-95XoJBOvFNgRRPR9BJg", name: "Okay.africa" },
      { id: "UC1uK-pqfQ-7KkWU6BccPIVA", name: "Prince Arts" },
      { id: "UCsPM7wLeuqPGH3IWotRSC-Q", name: "Pikini Production" },
      { id: "UCeLEGbj240J6JhpP7ba8GwA", name: "2stvsenegal" },
      { id: "UCn35kQ-UglSExf-q1nrvqRw", name: "Wally B. Seck" },
      { id: "UCwMWxiCc-AOj1RhifLyjpmg", name: "Infos Rewmi" },
      { id: "UCoK48xH4luB0UFOb_Okqw6w", name: "Youssou Ndour" },
      { id: "UCVu0Xhw05Jy7C_-mJg_HHEA", name: "Gelongal TV" },
      { id: "UC0KsfWiMAHoJb4ifuf9nn1A", name: "Dudu (Dudu fait des videos)" },
      { id: "UCKKbOgsOxOT83r1TdfjMaYg", name: "EvenProd" },
      { id: "UCk-ugzw9DIIYTJRQdjYVtfA", name: "BLO Tv" },
      { id: "UCH0XvUpYcxn4V0iZGnZXMnQ", name: "Lama Faché" },
      { id: "UCdzu75vyh-0MdCKgLGv60MQ", name: "Patisen TV" },  
   ];
 
  export interface Budget_Settings{
  budget: number;
  realBudget: number;
  dailyBudget: number;
  realDailyBudget: number;
  biddingScheme: string;
  impressions: number;
  clics: number;
  bidValue: number;
}

   export const bids = () =>
  [
    {id: 'CPM', name: "CPM", tooltip: "Cette stratégie est axée sur les impressions visibles."},
    {id: 'CPC', name: "CPC", tooltip: "Vous définissez votre propre coût par clic (CPC) maximal pour vos annonces."},
    {id: 'MC', name: "Maximiser les conversions", tooltip: "Cette stratégie définit les enchères de façon à vous aider à enregistrer un maximum de conversions dans les limites de votre budget."},
   
    
  ];

  // {id: 'CPA', name: "CPA", tooltip: "Cette stratégie définit les enchères de façon à obtenir autant de conversions que possible tout en atteignant votre objectif de coût par action (CPA) moyen."},
export const genders = () =>
  [
    {id: 10, name: "Homme"},
    {id: 11, name: "Femme"},
    {id: 20, name: "Non renseignés à Google", info: "(il est recommandé de laisser cette option cochée)"},
  ];

export const ages = () =>
  [
    {id: 503001, name: '18-24 ans'},
    {id: 503002, name: '25-34 ans'},
    {id: 503003, name: '35-44 ans'},
    {id: 503004, name: '45-54 ans'},
    {id: 503005, name: '55-64 ans'},
    {id: 503006, name: '+64 ans'},
    {id: 503999, name: 'Non renseignés à Google', info: "(il est recommandé de laisser cette option cochée)"}
  ];


  export interface SCHEDULE_INTERFACE {
  id: string;
  dayEN: string;
  dayFR: string;
  endHour: string;
  endMinute: string;
  end_hour_text: string;
  startHour: string;
  startMinute: string;
  start_hour_text: string;
  criterionId?: number;
  criterionType?: string
  
}

export const audience = [
  {
    "CriterionID": 10021,
    "Category": "/Apparel"
  },
  {
    "CriterionID": 10178,
    "Category": "/Apparel/Apparel Accessories"
  },
  {
    "CriterionID": 10937,
    "Category": "/Apparel/Apparel Accessories/Bags & Packs"
  },
  {
    "CriterionID": 12262,
    "Category": "/Apparel/Apparel Accessories/Bags & Packs/Backpacks & Utility Bags"
  },
  {
    "CriterionID": 12264,
    "Category": "/Apparel/Apparel Accessories/Bags & Packs/Briefcases"
  },
  {
    "CriterionID": 12263,
    "Category": "/Apparel/Apparel Accessories/Bags & Packs/Handbags & Purses"
  },
  {
    "CriterionID": 12265,
    "Category": "/Apparel/Apparel Accessories/Bags & Packs/Laptop & Computer Bags"
  },
  {
    "CriterionID": 10935,
    "Category": "/Apparel/Apparel Accessories/Belts & Suspenders"
  },
  {
    "CriterionID": 10938,
    "Category": "/Apparel/Apparel Accessories/Billfolds & Wallets"
  },
  {
    "CriterionID": 10936,
    "Category": "/Apparel/Apparel Accessories/Eyewear"
  },
  {
    "CriterionID": 12260,
    "Category": "/Apparel/Apparel Accessories/Eyewear/Reading Glasses"
  },
  {
    "CriterionID": 12261,
    "Category": "/Apparel/Apparel Accessories/Eyewear/Sunglasses"
  },
  {
    "CriterionID": 10939,
    "Category": "/Apparel/Apparel Accessories/Gloves & Mittens"
  },
  {
    "CriterionID": 10942,
    "Category": "/Apparel/Apparel Accessories/Hair Accessories"
  },
  {
    "CriterionID": 10941,
    "Category": "/Apparel/Apparel Accessories/Headwear"
  },
  {
    "CriterionID": 12266,
    "Category": "/Apparel/Apparel Accessories/Headwear/Hats"
  },
  {
    "CriterionID": 12267,
    "Category": "/Apparel/Apparel Accessories/Headwear/Headscarves & Bandanas"
  },
  {
    "CriterionID": 13701,
    "Category": "/Apparel/Apparel Accessories/Key Chains & Key Rings"
  },
  {
    "CriterionID": 13409,
    "Category": "/Apparel/Apparel Accessories/Parasols & Personal Sun Umbrellas"
  },
  {
    "CriterionID": 10943,
    "Category": "/Apparel/Apparel Accessories/Scarves & Shawls"
  },
  {
    "CriterionID": 10940,
    "Category": "/Apparel/Apparel Accessories/Ties"
  },
  {
    "CriterionID": 10176,
    "Category": "/Apparel/Clothing"
  },
  {
    "CriterionID": 13780,
    "Category": "/Apparel/Clothing/Children's Clothing"
  },
  {
    "CriterionID": 11019,
    "Category": "/Apparel/Clothing/Children's Clothing/Baby & Toddler Clothing"
  },
  {
    "CriterionID": 12292,
    "Category": "/Apparel/Clothing/Children's Clothing/Baby & Toddler Clothing/Baby & Toddler Shoes"
  },
  {
    "CriterionID": 12293,
    "Category": "/Apparel/Clothing/Children's Clothing/Baby & Toddler Clothing/Christening Gowns & Suits"
  },
  {
    "CriterionID": 12288,
    "Category": "/Apparel/Clothing/Children's Clothing/Baby & Toddler Clothing/Newborn Clothing"
  },
  {
    "CriterionID": 10924,
    "Category": "/Apparel/Clothing/Costumes & Costume Rental"
  },
  {
    "CriterionID": 10919,
    "Category": "/Apparel/Clothing/Culturally-Specific Clothing"
  },
  {
    "CriterionID": 10906,
    "Category": "/Apparel/Clothing/Custom Clothing"
  },
  {
    "CriterionID": 10916,
    "Category": "/Apparel/Clothing/Dancewear"
  },
  {
    "CriterionID": 10920,
    "Category": "/Apparel/Clothing/Formal Wear"
  },
  {
    "CriterionID": 12250,
    "Category": "/Apparel/Clothing/Formal Wear/Bridal Wear"
  },
  {
    "CriterionID": 10905,
    "Category": "/Apparel/Clothing/Formal Wear/Formal Wear Rentals"
  },
  {
    "CriterionID": 12252,
    "Category": "/Apparel/Clothing/Formal Wear/Prom Dresses"
  },
  {
    "CriterionID": 12251,
    "Category": "/Apparel/Clothing/Formal Wear/Tuxedos & Tuxedo Accessories"
  },
  {
    "CriterionID": 13778,
    "Category": "/Apparel/Clothing/Men's Clothing"
  },
  {
    "CriterionID": 10917,
    "Category": "/Apparel/Clothing/Outerwear"
  },
  {
    "CriterionID": 13356,
    "Category": "/Apparel/Clothing/Outerwear/Coats"
  },
  {
    "CriterionID": 13357,
    "Category": "/Apparel/Clothing/Outerwear/Slickers & Rainwear"
  },
  {
    "CriterionID": 12241,
    "Category": "/Apparel/Clothing/Pants, Jeans & Trousers"
  },
  {
    "CriterionID": 10912,
    "Category": "/Apparel/Clothing/Petite Clothing"
  },
  {
    "CriterionID": 10923,
    "Category": "/Apparel/Clothing/Plus Size Clothing"
  },
  {
    "CriterionID": 12237,
    "Category": "/Apparel/Clothing/Pullover Sweaters & Cardigans"
  },
  {
    "CriterionID": 12240,
    "Category": "/Apparel/Clothing/Shirts, Tops & Blouses"
  },
  {
    "CriterionID": 13117,
    "Category": "/Apparel/Clothing/Shirts, Tops & Blouses/Dress Shirts"
  },
  {
    "CriterionID": 13116,
    "Category": "/Apparel/Clothing/Shirts, Tops & Blouses/Jerseys & Knit Shirts"
  },
  {
    "CriterionID": 13315,
    "Category": "/Apparel/Clothing/Shirts, Tops & Blouses/Jerseys & Knit Shirts/T-Shirts"
  },
  {
    "CriterionID": 13118,
    "Category": "/Apparel/Clothing/Shirts, Tops & Blouses/Polo Shirts"
  },
  {
    "CriterionID": 12242,
    "Category": "/Apparel/Clothing/Shorts"
  },
  {
    "CriterionID": 10925,
    "Category": "/Apparel/Clothing/Sleepwear"
  },
  {
    "CriterionID": 10921,
    "Category": "/Apparel/Clothing/Socks & Hosiery"
  },
  {
    "CriterionID": 12243,
    "Category": "/Apparel/Clothing/Sport Coats & Jackets"
  },
  {
    "CriterionID": 10914,
    "Category": "/Apparel/Clothing/Suits & Business Attire"
  },
  {
    "CriterionID": 12238,
    "Category": "/Apparel/Clothing/Sweatshirts & Hoodies"
  },
  {
    "CriterionID": 11917,
    "Category": "/Apparel/Clothing/Swimwear"
  },
  {
    "CriterionID": 10913,
    "Category": "/Apparel/Clothing/Underwear"
  },
  {
    "CriterionID": 12246,
    "Category": "/Apparel/Clothing/Underwear/Boxers & Briefs"
  },
  {
    "CriterionID": 12245,
    "Category": "/Apparel/Clothing/Underwear/Lingerie & Intimate Apparel"
  },
  {
    "CriterionID": 13120,
    "Category": "/Apparel/Clothing/Underwear/Lingerie & Intimate Apparel/Body Shapers, Girdles & Bustiers"
  },
  {
    "CriterionID": 13123,
    "Category": "/Apparel/Clothing/Underwear/Lingerie & Intimate Apparel/Bras"
  },
  {
    "CriterionID": 13121,
    "Category": "/Apparel/Clothing/Underwear/Lingerie & Intimate Apparel/Slips"
  },
  {
    "CriterionID": 10926,
    "Category": "/Apparel/Clothing/Uniforms"
  },
  {
    "CriterionID": 12254,
    "Category": "/Apparel/Clothing/Uniforms/School Uniforms"
  },
  {
    "CriterionID": 12253,
    "Category": "/Apparel/Clothing/Uniforms/Work Uniforms"
  },
  {
    "CriterionID": 13124,
    "Category": "/Apparel/Clothing/Uniforms/Work Uniforms/Hospitality Service Uniforms"
  },
  {
    "CriterionID": 13125,
    "Category": "/Apparel/Clothing/Uniforms/Work Uniforms/Public Safety & Security Uniforms"
  },
  {
    "CriterionID": 10918,
    "Category": "/Apparel/Clothing/Utility Clothing"
  },
  {
    "CriterionID": 12239,
    "Category": "/Apparel/Clothing/Vests"
  },
  {
    "CriterionID": 13779,
    "Category": "/Apparel/Clothing/Women's Clothing"
  },
  {
    "CriterionID": 10915,
    "Category": "/Apparel/Clothing/Women's Clothing/Dresses"
  },
  {
    "CriterionID": 10922,
    "Category": "/Apparel/Clothing/Women's Clothing/Maternity Wear"
  },
  {
    "CriterionID": 12244,
    "Category": "/Apparel/Clothing/Women's Clothing/Skirts"
  },
  {
    "CriterionID": 10907,
    "Category": "/Apparel/Dry Cleaning & Alterations"
  },
  {
    "CriterionID": 10177,
    "Category": "/Apparel/Footwear"
  },
  {
    "CriterionID": 10619,
    "Category": "/Apparel/Footwear/Athletic Shoes"
  },
  {
    "CriterionID": 11895,
    "Category": "/Apparel/Footwear/Athletic Shoes/Cleats"
  },
  {
    "CriterionID": 11897,
    "Category": "/Apparel/Footwear/Athletic Shoes/Cross-Training Shoes"
  },
  {
    "CriterionID": 11898,
    "Category": "/Apparel/Footwear/Athletic Shoes/Running Shoes"
  },
  {
    "CriterionID": 11899,
    "Category": "/Apparel/Footwear/Athletic Shoes/Skate Shoes"
  },
  {
    "CriterionID": 11896,
    "Category": "/Apparel/Footwear/Athletic Shoes/Tennis Shoes"
  },
  {
    "CriterionID": 10931,
    "Category": "/Apparel/Footwear/Boots"
  },
  {
    "CriterionID": 12259,
    "Category": "/Apparel/Footwear/Boots/Cowboy Boots"
  },
  {
    "CriterionID": 12258,
    "Category": "/Apparel/Footwear/Boots/Fashion & Dress Boots"
  },
  {
    "CriterionID": 12257,
    "Category": "/Apparel/Footwear/Boots/Work Boots"
  },
  {
    "CriterionID": 10930,
    "Category": "/Apparel/Footwear/Casual Shoes"
  },
  {
    "CriterionID": 12256,
    "Category": "/Apparel/Footwear/Casual Shoes/Clogs"
  },
  {
    "CriterionID": 12255,
    "Category": "/Apparel/Footwear/Casual Shoes/Flats"
  },
  {
    "CriterionID": 10932,
    "Category": "/Apparel/Footwear/Dress Shoes"
  },
  {
    "CriterionID": 10172,
    "Category": "/Apparel/Footwear/Footwear Accessories"
  },
  {
    "CriterionID": 10933,
    "Category": "/Apparel/Footwear/Moccasins"
  },
  {
    "CriterionID": 10929,
    "Category": "/Apparel/Footwear/Roller Shoes"
  },
  {
    "CriterionID": 10927,
    "Category": "/Apparel/Footwear/Sandals"
  },
  {
    "CriterionID": 10173,
    "Category": "/Apparel/Footwear/Shoe Repair & Footwear Services"
  },
  {
    "CriterionID": 10928,
    "Category": "/Apparel/Footwear/Slippers"
  },
  {
    "CriterionID": 10934,
    "Category": "/Apparel/Footwear/Special Width & Orthopedic Shoes"
  },
  {
    "CriterionID": 10171,
    "Category": "/Apparel/Jewelry"
  },
  {
    "CriterionID": 10902,
    "Category": "/Apparel/Jewelry/Anklets"
  },
  {
    "CriterionID": 10721,
    "Category": "/Apparel/Jewelry/Antique Jewelry"
  },
  {
    "CriterionID": 10894,
    "Category": "/Apparel/Jewelry/Bracelets"
  },
  {
    "CriterionID": 10904,
    "Category": "/Apparel/Jewelry/Brooches & Pins"
  },
  {
    "CriterionID": 10896,
    "Category": "/Apparel/Jewelry/Cufflinks"
  },
  {
    "CriterionID": 10901,
    "Category": "/Apparel/Jewelry/Earrings"
  },
  {
    "CriterionID": 10910,
    "Category": "/Apparel/Jewelry/Jewelry Cleaning & Repair"
  },
  {
    "CriterionID": 10903,
    "Category": "/Apparel/Jewelry/Necklaces"
  },
  {
    "CriterionID": 10897,
    "Category": "/Apparel/Jewelry/Pearls & Pearl Jewelry"
  },
  {
    "CriterionID": 10893,
    "Category": "/Apparel/Jewelry/Precious & Semi-Precious Gems & Gemstone Jewelry"
  },
  {
    "CriterionID": 12234,
    "Category": "/Apparel/Jewelry/Precious & Semi-Precious Gems & Gemstone Jewelry/Birthstone Jewelry"
  },
  {
    "CriterionID": 12233,
    "Category": "/Apparel/Jewelry/Precious & Semi-Precious Gems & Gemstone Jewelry/Diamond Jewelry"
  },
  {
    "CriterionID": 10895,
    "Category": "/Apparel/Jewelry/Precious Metal Jewelry"
  },
  {
    "CriterionID": 12235,
    "Category": "/Apparel/Jewelry/Precious Metal Jewelry/Gold Jewelry"
  },
  {
    "CriterionID": 13115,
    "Category": "/Apparel/Jewelry/Precious Metal Jewelry/Gold Jewelry/Gold Watches"
  },
  {
    "CriterionID": 12236,
    "Category": "/Apparel/Jewelry/Precious Metal Jewelry/Silver Jewelry"
  },
  {
    "CriterionID": 10892,
    "Category": "/Apparel/Jewelry/Rings"
  },
  {
    "CriterionID": 12231,
    "Category": "/Apparel/Jewelry/Rings/Engagement Rings"
  },
  {
    "CriterionID": 12232,
    "Category": "/Apparel/Jewelry/Rings/Wedding Rings"
  },
  {
    "CriterionID": 10899,
    "Category": "/Apparel/Jewelry/Watches & Watch Accessories"
  },
  {
    "CriterionID": 13355,
    "Category": "/Apparel/Rain Gear"
  },
  {
    "CriterionID": 13354,
    "Category": "/Apparel/Rain Gear/Rain Umbrellas"
  },
  {
    "CriterionID": 10013,
    "Category": "/Arts & Entertainment"
  },
  {
    "CriterionID": 13530,
    "Category": "/Arts & Entertainment/Arts & Entertainment Awards"
  },
  {
    "CriterionID": 13760,
    "Category": "/Arts & Entertainment/Cartoons"
  },
  {
    "CriterionID": 10723,
    "Category": "/Arts & Entertainment/Comics & Graphic Novels"
  },
  {
    "CriterionID": 13443,
    "Category": "/Arts & Entertainment/Comics & Graphic Novels/Comic Strips"
  },
  {
    "CriterionID": 12001,
    "Category": "/Arts & Entertainment/Comics & Graphic Novels/Independent & Alternative Comic Books"
  },
  {
    "CriterionID": 13570,
    "Category": "/Arts & Entertainment/Comics & Graphic Novels/Manga"
  },
  {
    "CriterionID": 12002,
    "Category": "/Arts & Entertainment/Comics & Graphic Novels/Superhero Comic Books"
  },
  {
    "CriterionID": 10105,
    "Category": "/Arts & Entertainment/Entertainment Industry"
  },
  {
    "CriterionID": 13536,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry"
  },
  {
    "CriterionID": 10566,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting"
  },
  {
    "CriterionID": 11860,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/Digital TV"
  },
  {
    "CriterionID": 11859,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/Internet TV"
  },
  {
    "CriterionID": 13897,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Networks & Stations"
  },
  {
    "CriterionID": 10557,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs"
  },
  {
    "CriterionID": 13880,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Comedies"
  },
  {
    "CriterionID": 13881,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Documentary & Nonfiction"
  },
  {
    "CriterionID": 13882,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Dramas"
  },
  {
    "CriterionID": 13883,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Family-Oriented Shows"
  },
  {
    "CriterionID": 13884,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Game Shows"
  },
  {
    "CriterionID": 13885,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Reality Shows"
  },
  {
    "CriterionID": 13886,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Sci-Fi & Fantasy Shows"
  },
  {
    "CriterionID": 13887,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Talent & Variety Shows"
  },
  {
    "CriterionID": 13888,
    "Category": "/Arts & Entertainment/Entertainment Industry/Film & TV Industry/TV Broadcasting/TV Shows & Programs/TV Talk Shows"
  },
  {
    "CriterionID": 13574,
    "Category": "/Arts & Entertainment/Entertainment Industry/Music & Recording Industry"
  },
  {
    "CriterionID": 10565,
    "Category": "/Arts & Entertainment/Entertainment Industry/Talent Promotion"
  },
  {
    "CriterionID": 13670,
    "Category": "/Arts & Entertainment/Entertainment Media Retailers"
  },
  {
    "CriterionID": 10104,
    "Category": "/Arts & Entertainment/Event Entertainment"
  },
  {
    "CriterionID": 10563,
    "Category": "/Arts & Entertainment/Event Entertainment/Bachelor & Bachelorette Parties"
  },
  {
    "CriterionID": 10564,
    "Category": "/Arts & Entertainment/Event Entertainment/Children's Parties"
  },
  {
    "CriterionID": 13751,
    "Category": "/Arts & Entertainment/Event Entertainment/Fireworks"
  },
  {
    "CriterionID": 13492,
    "Category": "/Arts & Entertainment/Event Entertainment/Wedding Entertainment"
  },
  {
    "CriterionID": 10111,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions"
  },
  {
    "CriterionID": 13499,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Art Fairs & Festivals"
  },
  {
    "CriterionID": 10606,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Event & Show Guides & Listings"
  },
  {
    "CriterionID": 10602,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Expo Events & Shows"
  },
  {
    "CriterionID": 11881,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Expo Events & Shows/Car & Vehicle Shows"
  },
  {
    "CriterionID": 11880,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Expo Events & Shows/Flower, Garden & Home Shows"
  },
  {
    "CriterionID": 13498,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Film Festivals"
  },
  {
    "CriterionID": 13500,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Food & Beverage Events"
  },
  {
    "CriterionID": 13852,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Live Comedy"
  },
  {
    "CriterionID": 11885,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Special Exhibits"
  },
  {
    "CriterionID": 11886,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Theater & Theater Tickets"
  },
  {
    "CriterionID": 10603,
    "Category": "/Arts & Entertainment/Events, Shows & Cultural Attractions/Ticket Sales & Exchanges"
  },
  {
    "CriterionID": 13425,
    "Category": "/Arts & Entertainment/Fun & Trivia"
  },
  {
    "CriterionID": 13489,
    "Category": "/Arts & Entertainment/Fun & Trivia/Fun Tests & Silly Surveys"
  },
  {
    "CriterionID": 10106,
    "Category": "/Arts & Entertainment/Humor & Jokes"
  },
  {
    "CriterionID": 13417,
    "Category": "/Arts & Entertainment/Movies & Films"
  },
  {
    "CriterionID": 13515,
    "Category": "/Arts & Entertainment/Movies & Films/Action & Adventure Films"
  },
  {
    "CriterionID": 13516,
    "Category": "/Arts & Entertainment/Movies & Films/Action & Adventure Films/Martial Arts Films"
  },
  {
    "CriterionID": 13517,
    "Category": "/Arts & Entertainment/Movies & Films/Action & Adventure Films/Superhero Films"
  },
  {
    "CriterionID": 13853,
    "Category": "/Arts & Entertainment/Movies & Films/Action & Adventure Films/Western Films"
  },
  {
    "CriterionID": 13518,
    "Category": "/Arts & Entertainment/Movies & Films/Animated Films"
  },
  {
    "CriterionID": 13663,
    "Category": "/Arts & Entertainment/Movies & Films/Animated Films/Anime"
  },
  {
    "CriterionID": 13519,
    "Category": "/Arts & Entertainment/Movies & Films/Bollywood & South Asian Film"
  },
  {
    "CriterionID": 13520,
    "Category": "/Arts & Entertainment/Movies & Films/Classic Films"
  },
  {
    "CriterionID": 13523,
    "Category": "/Arts & Entertainment/Movies & Films/Comedy Films"
  },
  {
    "CriterionID": 13521,
    "Category": "/Arts & Entertainment/Movies & Films/Cult & Indie Films"
  },
  {
    "CriterionID": 13522,
    "Category": "/Arts & Entertainment/Movies & Films/Documentary Films"
  },
  {
    "CriterionID": 13524,
    "Category": "/Arts & Entertainment/Movies & Films/Drama Films"
  },
  {
    "CriterionID": 13532,
    "Category": "/Arts & Entertainment/Movies & Films/Family & Children's Films"
  },
  {
    "CriterionID": 13531,
    "Category": "/Arts & Entertainment/Movies & Films/Film Noir"
  },
  {
    "CriterionID": 13729,
    "Category": "/Arts & Entertainment/Movies & Films/Filmmaking"
  },
  {
    "CriterionID": 13525,
    "Category": "/Arts & Entertainment/Movies & Films/Horror Films"
  },
  {
    "CriterionID": 13528,
    "Category": "/Arts & Entertainment/Movies & Films/Movie Theaters"
  },
  {
    "CriterionID": 10554,
    "Category": "/Arts & Entertainment/Movies & Films/Movie Tickets"
  },
  {
    "CriterionID": 13527,
    "Category": "/Arts & Entertainment/Movies & Films/Musical Films"
  },
  {
    "CriterionID": 13534,
    "Category": "/Arts & Entertainment/Movies & Films/Romance Films"
  },
  {
    "CriterionID": 13526,
    "Category": "/Arts & Entertainment/Movies & Films/Science Fiction & Fantasy Films"
  },
  {
    "CriterionID": 13535,
    "Category": "/Arts & Entertainment/Movies & Films/Sports Films"
  },
  {
    "CriterionID": 13533,
    "Category": "/Arts & Entertainment/Movies & Films/Thriller, Crime & Mystery Films"
  },
  {
    "CriterionID": 13529,
    "Category": "/Arts & Entertainment/Movies & Films/War Films"
  },
  {
    "CriterionID": 10109,
    "Category": "/Arts & Entertainment/Music & Audio"
  },
  {
    "CriterionID": 13799,
    "Category": "/Arts & Entertainment/Music & Audio/Children's Music"
  },
  {
    "CriterionID": 13538,
    "Category": "/Arts & Entertainment/Music & Audio/Classical Music"
  },
  {
    "CriterionID": 10593,
    "Category": "/Arts & Entertainment/Music & Audio/Concerts & Music Festivals"
  },
  {
    "CriterionID": 13539,
    "Category": "/Arts & Entertainment/Music & Audio/Country Music"
  },
  {
    "CriterionID": 13540,
    "Category": "/Arts & Entertainment/Music & Audio/Dance & Electronic Music"
  },
  {
    "CriterionID": 13541,
    "Category": "/Arts & Entertainment/Music & Audio/Experimental & Industrial Music"
  },
  {
    "CriterionID": 13542,
    "Category": "/Arts & Entertainment/Music & Audio/Folk & Traditional Music"
  },
  {
    "CriterionID": 13552,
    "Category": "/Arts & Entertainment/Music & Audio/Indie & Alternative Music"
  },
  {
    "CriterionID": 13543,
    "Category": "/Arts & Entertainment/Music & Audio/Jazz & Blues"
  },
  {
    "CriterionID": 13545,
    "Category": "/Arts & Entertainment/Music & Audio/Jazz & Blues/Blues"
  },
  {
    "CriterionID": 13544,
    "Category": "/Arts & Entertainment/Music & Audio/Jazz & Blues/Jazz"
  },
  {
    "CriterionID": 13672,
    "Category": "/Arts & Entertainment/Music & Audio/Latin Music"
  },
  {
    "CriterionID": 10596,
    "Category": "/Arts & Entertainment/Music & Audio/Music & Audio CDs"
  },
  {
    "CriterionID": 10595,
    "Category": "/Arts & Entertainment/Music & Audio/Music & Audio Retailers"
  },
  {
    "CriterionID": 13427,
    "Category": "/Arts & Entertainment/Music & Audio/Music Education & Instruction"
  },
  {
    "CriterionID": 10591,
    "Category": "/Arts & Entertainment/Music & Audio/Music Streams & Downloads"
  },
  {
    "CriterionID": 10590,
    "Category": "/Arts & Entertainment/Music & Audio/Music Videos"
  },
  {
    "CriterionID": 10592,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment"
  },
  {
    "CriterionID": 13855,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Drums & Percussion"
  },
  {
    "CriterionID": 11879,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Guitars"
  },
  {
    "CriterionID": 13537,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Music Recording Technology"
  },
  {
    "CriterionID": 11877,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Musical Instrument & Performance Amplifiers"
  },
  {
    "CriterionID": 11878,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Musical Instrument Digital Interfaces & Synthesizers"
  },
  {
    "CriterionID": 13424,
    "Category": "/Arts & Entertainment/Music & Audio/Musical Instruments & Equipment/Pianos & Keyboards"
  },
  {
    "CriterionID": 13546,
    "Category": "/Arts & Entertainment/Music & Audio/Pop Music"
  },
  {
    "CriterionID": 10570,
    "Category": "/Arts & Entertainment/Music & Audio/Radio"
  },
  {
    "CriterionID": 10587,
    "Category": "/Arts & Entertainment/Music & Audio/Radio/Internet Radio"
  },
  {
    "CriterionID": 11865,
    "Category": "/Arts & Entertainment/Music & Audio/Radio/Radio Programs & Shows"
  },
  {
    "CriterionID": 12971,
    "Category": "/Arts & Entertainment/Music & Audio/Radio/Satellite Radio"
  },
  {
    "CriterionID": 10588,
    "Category": "/Arts & Entertainment/Music & Audio/Record Labels"
  },
  {
    "CriterionID": 13547,
    "Category": "/Arts & Entertainment/Music & Audio/Religious Music"
  },
  {
    "CriterionID": 13548,
    "Category": "/Arts & Entertainment/Music & Audio/Religious Music/Christian & Gospel Music"
  },
  {
    "CriterionID": 13549,
    "Category": "/Arts & Entertainment/Music & Audio/Rock Music"
  },
  {
    "CriterionID": 13550,
    "Category": "/Arts & Entertainment/Music & Audio/Rock Music/Classic Rock & Oldies"
  },
  {
    "CriterionID": 13551,
    "Category": "/Arts & Entertainment/Music & Audio/Rock Music/Hard Rock & Progressive"
  },
  {
    "CriterionID": 13553,
    "Category": "/Arts & Entertainment/Music & Audio/Rock Music/Metal (Music)"
  },
  {
    "CriterionID": 13554,
    "Category": "/Arts & Entertainment/Music & Audio/Rock Music/Punk Rock"
  },
  {
    "CriterionID": 10589,
    "Category": "/Arts & Entertainment/Music & Audio/Song Lyrics & Tabs"
  },
  {
    "CriterionID": 13568,
    "Category": "/Arts & Entertainment/Music & Audio/Songwriters & Composers"
  },
  {
    "CriterionID": 13555,
    "Category": "/Arts & Entertainment/Music & Audio/Soundtracks"
  },
  {
    "CriterionID": 13556,
    "Category": "/Arts & Entertainment/Music & Audio/Urban & Hip-Hop"
  },
  {
    "CriterionID": 13557,
    "Category": "/Arts & Entertainment/Music & Audio/Urban & Hip-Hop/Rap & Hip-Hop"
  },
  {
    "CriterionID": 13743,
    "Category": "/Arts & Entertainment/Music & Audio/Urban & Hip-Hop/Reggaeton"
  },
  {
    "CriterionID": 13558,
    "Category": "/Arts & Entertainment/Music & Audio/Urban & Hip-Hop/Soul & R&B"
  },
  {
    "CriterionID": 13832,
    "Category": "/Arts & Entertainment/Music & Audio/Vinyl Records"
  },
  {
    "CriterionID": 13559,
    "Category": "/Arts & Entertainment/Music & Audio/Vocals & Show Tunes"
  },
  {
    "CriterionID": 13560,
    "Category": "/Arts & Entertainment/Music & Audio/World Music"
  },
  {
    "CriterionID": 13561,
    "Category": "/Arts & Entertainment/Music & Audio/World Music/African Music"
  },
  {
    "CriterionID": 13562,
    "Category": "/Arts & Entertainment/Music & Audio/World Music/Arab & Middle Eastern Music"
  },
  {
    "CriterionID": 13563,
    "Category": "/Arts & Entertainment/Music & Audio/World Music/East Asian Music"
  },
  {
    "CriterionID": 13564,
    "Category": "/Arts & Entertainment/Music & Audio/World Music/Reggae & Caribbean Music"
  },
  {
    "CriterionID": 13565,
    "Category": "/Arts & Entertainment/Music & Audio/World Music/South Asian Music"
  },
  {
    "CriterionID": 13566,
    "Category": "/Arts & Entertainment/Offbeat"
  },
  {
    "CriterionID": 13567,
    "Category": "/Arts & Entertainment/Offbeat/Edgy & Bizarre"
  },
  {
    "CriterionID": 10110,
    "Category": "/Arts & Entertainment/Sports Entertainment"
  },
  {
    "CriterionID": 10598,
    "Category": "/Arts & Entertainment/Sports Entertainment/Fantasy Sports"
  },
  {
    "CriterionID": 13635,
    "Category": "/Arts & Entertainment/Sports Entertainment/Professional Wrestling"
  },
  {
    "CriterionID": 10597,
    "Category": "/Arts & Entertainment/Sports Entertainment/Sport Scores & Statistics"
  },
  {
    "CriterionID": 11883,
    "Category": "/Arts & Entertainment/Sports Entertainment/Sports Event Tickets & Ticketing Services"
  },
  {
    "CriterionID": 10599,
    "Category": "/Arts & Entertainment/Sports Entertainment/Sports Fan Sites & Blogs"
  },
  {
    "CriterionID": 10103,
    "Category": "/Arts & Entertainment/TV & Video"
  },
  {
    "CriterionID": 13511,
    "Category": "/Arts & Entertainment/TV & Video/Blu-Ray Discs"
  },
  {
    "CriterionID": 10561,
    "Category": "/Arts & Entertainment/TV & Video/DVD & Blu-Ray Retailers"
  },
  {
    "CriterionID": 13824,
    "Category": "/Arts & Entertainment/TV & Video/DVD & Video Rentals"
  },
  {
    "CriterionID": 10558,
    "Category": "/Arts & Entertainment/TV & Video/Entertainment DVDs"
  },
  {
    "CriterionID": 10553,
    "Category": "/Arts & Entertainment/TV & Video/Movie & TV Fan Sites"
  },
  {
    "CriterionID": 13572,
    "Category": "/Arts & Entertainment/TV & Video/Movie & TV Reference"
  },
  {
    "CriterionID": 10560,
    "Category": "/Arts & Entertainment/TV & Video/Movie & TV Reference/Movie Reviews, Previews & Listings"
  },
  {
    "CriterionID": 13730,
    "Category": "/Arts & Entertainment/TV & Video/Movie & TV Reference/TV Guides & Reference"
  },
  {
    "CriterionID": 10556,
    "Category": "/Arts & Entertainment/TV & Video/Video Clips"
  },
  {
    "CriterionID": 10562,
    "Category": "/Arts & Entertainment/TV & Video/Video On Demand"
  },
  {
    "CriterionID": 13388,
    "Category": "/Arts & Entertainment/Visual Art & Design"
  },
  {
    "CriterionID": 13595,
    "Category": "/Arts & Entertainment/Visual Art & Design/Painting"
  },
  {
    "CriterionID": 10005,
    "Category": "/Beauty & Personal Care"
  },
  {
    "CriterionID": 10050,
    "Category": "/Beauty & Personal Care/Anti-Aging"
  },
  {
    "CriterionID": 11434,
    "Category": "/Beauty & Personal Care/Anti-Aging/Anti-Aging Creams & Moisturizers"
  },
  {
    "CriterionID": 13422,
    "Category": "/Beauty & Personal Care/Body Art"
  },
  {
    "CriterionID": 10898,
    "Category": "/Beauty & Personal Care/Body Art/Body Jewelry & Piercings"
  },
  {
    "CriterionID": 10315,
    "Category": "/Beauty & Personal Care/Body Art/Tattoo Removal"
  },
  {
    "CriterionID": 13636,
    "Category": "/Beauty & Personal Care/Fashion & Style"
  },
  {
    "CriterionID": 13637,
    "Category": "/Beauty & Personal Care/Fashion & Style/Fashion Designers & Collections"
  },
  {
    "CriterionID": 13638,
    "Category": "/Beauty & Personal Care/Fashion & Style/Fashion Modeling"
  },
  {
    "CriterionID": 11414,
    "Category": "/Beauty & Personal Care/Fashion & Style/Virtual Makeovers"
  },
  {
    "CriterionID": 10055,
    "Category": "/Beauty & Personal Care/Hair Care"
  },
  {
    "CriterionID": 10335,
    "Category": "/Beauty & Personal Care/Hair Care/Damaged Hair"
  },
  {
    "CriterionID": 10337,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Dyes & Coloring"
  },
  {
    "CriterionID": 10477,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Loss"
  },
  {
    "CriterionID": 11727,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Loss/Hair Loss Procedures"
  },
  {
    "CriterionID": 11726,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Loss/Hair Loss Products"
  },
  {
    "CriterionID": 10336,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Straighteners & Relaxers"
  },
  {
    "CriterionID": 10339,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Styling"
  },
  {
    "CriterionID": 10340,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Styling/Hair Brushes & Styling Equipment"
  },
  {
    "CriterionID": 10333,
    "Category": "/Beauty & Personal Care/Hair Care/Hair Styling/Hair Salons & Styling Services"
  },
  {
    "CriterionID": 10338,
    "Category": "/Beauty & Personal Care/Hair Care/Shampoos & Conditioners"
  },
  {
    "CriterionID": 10332,
    "Category": "/Beauty & Personal Care/Hair Care/Wigs & Wig Accessories"
  },
  {
    "CriterionID": 10060,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries"
  },
  {
    "CriterionID": 10355,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries/Antiperspirants, Deodorants & Body Spray"
  },
  {
    "CriterionID": 10354,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries/Cotton Swabs, Balls & Pads"
  },
  {
    "CriterionID": 10356,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries/Feminine Hygiene Products"
  },
  {
    "CriterionID": 11432,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries/Feminine Hygiene Products/Sanitary Pads & Napkins"
  },
  {
    "CriterionID": 11433,
    "Category": "/Beauty & Personal Care/Hygiene & Toiletries/Feminine Hygiene Products/Tampons"
  },
  {
    "CriterionID": 13866,
    "Category": "/Beauty & Personal Care/Insect Repellent"
  },
  {
    "CriterionID": 10053,
    "Category": "/Beauty & Personal Care/Lip Care"
  },
  {
    "CriterionID": 10054,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics"
  },
  {
    "CriterionID": 10325,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Blush"
  },
  {
    "CriterionID": 10329,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Concealer"
  },
  {
    "CriterionID": 10324,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Eye Make-Up"
  },
  {
    "CriterionID": 11419,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Eye Make-Up/Eyeshadow"
  },
  {
    "CriterionID": 11420,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Eye Make-Up/Mascara & Eyelash Products"
  },
  {
    "CriterionID": 10327,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Face Powder"
  },
  {
    "CriterionID": 10330,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Foundation"
  },
  {
    "CriterionID": 10323,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Lipsticks & Lip Glosses"
  },
  {
    "CriterionID": 10331,
    "Category": "/Beauty & Personal Care/Make-Up & Cosmetics/Make-Up Brushes & Tools"
  },
  {
    "CriterionID": 10051,
    "Category": "/Beauty & Personal Care/Nail Care"
  },
  {
    "CriterionID": 10322,
    "Category": "/Beauty & Personal Care/Nail Care/Manicures & Pedicures"
  },
  {
    "CriterionID": 10320,
    "Category": "/Beauty & Personal Care/Nail Care/Nail Care Tools"
  },
  {
    "CriterionID": 10321,
    "Category": "/Beauty & Personal Care/Nail Care/Nail Fungus Products"
  },
  {
    "CriterionID": 10319,
    "Category": "/Beauty & Personal Care/Nail Care/Nail Polish & Nail Polish Accessories"
  },
  {
    "CriterionID": 10059,
    "Category": "/Beauty & Personal Care/Oral Care"
  },
  {
    "CriterionID": 10345,
    "Category": "/Beauty & Personal Care/Oral Care/Canker Sore Treatments"
  },
  {
    "CriterionID": 10349,
    "Category": "/Beauty & Personal Care/Oral Care/Dental Care Gum"
  },
  {
    "CriterionID": 10347,
    "Category": "/Beauty & Personal Care/Oral Care/Dental Floss & Gum Health"
  },
  {
    "CriterionID": 10353,
    "Category": "/Beauty & Personal Care/Oral Care/Denture Care"
  },
  {
    "CriterionID": 10348,
    "Category": "/Beauty & Personal Care/Oral Care/Mouthwash"
  },
  {
    "CriterionID": 10346,
    "Category": "/Beauty & Personal Care/Oral Care/Teeth Whitening"
  },
  {
    "CriterionID": 10351,
    "Category": "/Beauty & Personal Care/Oral Care/Toothache Relief"
  },
  {
    "CriterionID": 10352,
    "Category": "/Beauty & Personal Care/Oral Care/Toothbrushes & Toothbrush Accessories"
  },
  {
    "CriterionID": 11431,
    "Category": "/Beauty & Personal Care/Oral Care/Toothbrushes & Toothbrush Accessories/Manual Toothbrushes"
  },
  {
    "CriterionID": 11430,
    "Category": "/Beauty & Personal Care/Oral Care/Toothbrushes & Toothbrush Accessories/Powered Toothbrushes"
  },
  {
    "CriterionID": 10350,
    "Category": "/Beauty & Personal Care/Oral Care/Toothpaste"
  },
  {
    "CriterionID": 10057,
    "Category": "/Beauty & Personal Care/Perfumes & Fragrances"
  },
  {
    "CriterionID": 10058,
    "Category": "/Beauty & Personal Care/Shaving & Grooming"
  },
  {
    "CriterionID": 10342,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Personal Grooming Kits & Equipment"
  },
  {
    "CriterionID": 11425,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers"
  },
  {
    "CriterionID": 12726,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Electric Shavers"
  },
  {
    "CriterionID": 13244,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Electric Shavers/Men's Electric Shavers"
  },
  {
    "CriterionID": 13243,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Electric Shavers/Women's Electric Shavers & Epilators"
  },
  {
    "CriterionID": 12727,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Razors"
  },
  {
    "CriterionID": 13246,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Razors/Men's Razors"
  },
  {
    "CriterionID": 13245,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Razors & Shavers/Razors/Women's Razors"
  },
  {
    "CriterionID": 10343,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal"
  },
  {
    "CriterionID": 12724,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal/Electrolysis"
  },
  {
    "CriterionID": 11422,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal/Hair Removal Creams"
  },
  {
    "CriterionID": 12725,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal/Laser Hair Removal"
  },
  {
    "CriterionID": 12723,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal/Professional Waxing"
  },
  {
    "CriterionID": 11423,
    "Category": "/Beauty & Personal Care/Shaving & Grooming/Unwanted Body & Facial Hair Removal/Waxing Products & Accessories"
  },
  {
    "CriterionID": 10047,
    "Category": "/Beauty & Personal Care/Skin Care"
  },
  {
    "CriterionID": 10309,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing"
  },
  {
    "CriterionID": 11410,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing/Bath Additions"
  },
  {
    "CriterionID": 11411,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing/Bathing Equipment"
  },
  {
    "CriterionID": 12721,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing/Body Wipes"
  },
  {
    "CriterionID": 11412,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing/Hand & Body Soaps & Cleansers"
  },
  {
    "CriterionID": 12722,
    "Category": "/Beauty & Personal Care/Skin Care/Body Cleansing/Hand & Body Soaps & Cleansers/Liquid Soaps"
  },
  {
    "CriterionID": 10310,
    "Category": "/Beauty & Personal Care/Skin Care/Body Lotions & Oils"
  },
  {
    "CriterionID": 13850,
    "Category": "/Beauty & Personal Care/Skin Care/Exfoliants & Scrubs"
  },
  {
    "CriterionID": 10061,
    "Category": "/Beauty & Personal Care/Skin Care/Face Care"
  },
  {
    "CriterionID": 10358,
    "Category": "/Beauty & Personal Care/Skin Care/Face Care/Face Lotions & Moisturizers"
  },
  {
    "CriterionID": 10359,
    "Category": "/Beauty & Personal Care/Skin Care/Face Care/Facial Cleansers & Make-Up Removers"
  },
  {
    "CriterionID": 10049,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa"
  },
  {
    "CriterionID": 10316,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Aromatherapy & Essential Oils"
  },
  {
    "CriterionID": 10314,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/At-Home Spa Equipment"
  },
  {
    "CriterionID": 10317,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures"
  },
  {
    "CriterionID": 11418,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures/Laser Skin Treatments"
  },
  {
    "CriterionID": 11417,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures/Microdermabrasion"
  },
  {
    "CriterionID": 11416,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures/Non-Surgical Fat Loss"
  },
  {
    "CriterionID": 11415,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures/Permanent Make-up Services"
  },
  {
    "CriterionID": 12939,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Cosmetic Procedures/Wrinkle Treatments"
  },
  {
    "CriterionID": 13704,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Day Spas & Salon Spas"
  },
  {
    "CriterionID": 13705,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Destination & Resort Spas"
  },
  {
    "CriterionID": 13446,
    "Category": "/Beauty & Personal Care/Spa & Medical Spa/Saunas"
  },
  {
    "CriterionID": 10048,
    "Category": "/Beauty & Personal Care/Tanning & Sun Care"
  },
  {
    "CriterionID": 10311,
    "Category": "/Beauty & Personal Care/Tanning & Sun Care/Sun Lotions & Sunscreen"
  },
  {
    "CriterionID": 11413,
    "Category": "/Beauty & Personal Care/Tanning & Sun Care/Sun Lotions & Sunscreen/Self-Tanning Lotions & Products"
  },
  {
    "CriterionID": 10313,
    "Category": "/Beauty & Personal Care/Tanning & Sun Care/Tanning Beds"
  },
  {
    "CriterionID": 10312,
    "Category": "/Beauty & Personal Care/Tanning & Sun Care/Tanning Services"
  },
  {
    "CriterionID": 10004,
    "Category": "/Business & Industrial"
  },
  {
    "CriterionID": 13864,
    "Category": "/Business & Industrial/Aerospace & Defense"
  },
  {
    "CriterionID": 13460,
    "Category": "/Business & Industrial/Agriculture"
  },
  {
    "CriterionID": 11194,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment"
  },
  {
    "CriterionID": 12444,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Balers"
  },
  {
    "CriterionID": 12438,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Crop Sprayers"
  },
  {
    "CriterionID": 12440,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Cultivators"
  },
  {
    "CriterionID": 12443,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Farm Tractors"
  },
  {
    "CriterionID": 13159,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Farm Tractors/Front End Loaders"
  },
  {
    "CriterionID": 13160,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Farm Tractors/Walking Tractors"
  },
  {
    "CriterionID": 12439,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Feed Grinders"
  },
  {
    "CriterionID": 12441,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Grain Augers & Conveyors"
  },
  {
    "CriterionID": 12434,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Manure & Seed Spreaders"
  },
  {
    "CriterionID": 12436,
    "Category": "/Business & Industrial/Agriculture/Agricultural Equipment/Rock Pickers"
  },
  {
    "CriterionID": 11074,
    "Category": "/Business & Industrial/Agriculture/Agricultural Research"
  },
  {
    "CriterionID": 11076,
    "Category": "/Business & Industrial/Agriculture/Agricultural Testing & Analysis"
  },
  {
    "CriterionID": 12357,
    "Category": "/Business & Industrial/Agriculture/Agricultural Testing & Analysis/Crop Consulting"
  },
  {
    "CriterionID": 12356,
    "Category": "/Business & Industrial/Agriculture/Agricultural Testing & Analysis/Soil Testing & Analysis"
  },
  {
    "CriterionID": 12552,
    "Category": "/Business & Industrial/Agriculture/Agrochemicals"
  },
  {
    "CriterionID": 11073,
    "Category": "/Business & Industrial/Agriculture/Aquaculture & Fishery Services"
  },
  {
    "CriterionID": 11188,
    "Category": "/Business & Industrial/Agriculture/Crops"
  },
  {
    "CriterionID": 12428,
    "Category": "/Business & Industrial/Agriculture/Crops/Cereal & Grain"
  },
  {
    "CriterionID": 12427,
    "Category": "/Business & Industrial/Agriculture/Crops/Seed"
  },
  {
    "CriterionID": 11083,
    "Category": "/Business & Industrial/Agriculture/Forestry"
  },
  {
    "CriterionID": 12423,
    "Category": "/Business & Industrial/Agriculture/Forestry/Firewood & Firewood Equipment"
  },
  {
    "CriterionID": 13156,
    "Category": "/Business & Industrial/Agriculture/Forestry/Firewood & Firewood Equipment/Firewood Processors"
  },
  {
    "CriterionID": 13157,
    "Category": "/Business & Industrial/Agriculture/Forestry/Firewood & Firewood Equipment/Log Splitters"
  },
  {
    "CriterionID": 12422,
    "Category": "/Business & Industrial/Agriculture/Forestry/Land-Clearing"
  },
  {
    "CriterionID": 12366,
    "Category": "/Business & Industrial/Agriculture/Forestry/Logging & Milling"
  },
  {
    "CriterionID": 11078,
    "Category": "/Business & Industrial/Agriculture/Horticulture"
  },
  {
    "CriterionID": 13375,
    "Category": "/Business & Industrial/Agriculture/Horticulture/Greenhouse & Nursery Equipment & Supplies"
  },
  {
    "CriterionID": 11190,
    "Category": "/Business & Industrial/Agriculture/Irrigation"
  },
  {
    "CriterionID": 12430,
    "Category": "/Business & Industrial/Agriculture/Irrigation/Sprinklers"
  },
  {
    "CriterionID": 12429,
    "Category": "/Business & Industrial/Agriculture/Irrigation/Water Hoses & Accessories"
  },
  {
    "CriterionID": 11192,
    "Category": "/Business & Industrial/Agriculture/Livestock"
  },
  {
    "CriterionID": 12432,
    "Category": "/Business & Industrial/Agriculture/Livestock/Cattle"
  },
  {
    "CriterionID": 12433,
    "Category": "/Business & Industrial/Agriculture/Livestock/Domestic Pigs"
  },
  {
    "CriterionID": 12365,
    "Category": "/Business & Industrial/Agriculture/Livestock/Livestock Auctioning"
  },
  {
    "CriterionID": 12361,
    "Category": "/Business & Industrial/Agriculture/Livestock/Livestock Breeding"
  },
  {
    "CriterionID": 12360,
    "Category": "/Business & Industrial/Agriculture/Livestock/Livestock Feed"
  },
  {
    "CriterionID": 12364,
    "Category": "/Business & Industrial/Agriculture/Livestock/Livestock Slaughtering & Processing"
  },
  {
    "CriterionID": 12431,
    "Category": "/Business & Industrial/Agriculture/Livestock/Poultry"
  },
  {
    "CriterionID": 11301,
    "Category": "/Business & Industrial/Agriculture/Natural Fibers"
  },
  {
    "CriterionID": 10282,
    "Category": "/Business & Industrial/Building Construction & Maintenance"
  },
  {
    "CriterionID": 13797,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies"
  },
  {
    "CriterionID": 10700,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Architectural Salvage & Reclaimed Building Materials"
  },
  {
    "CriterionID": 11281,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Awnings & Canopies"
  },
  {
    "CriterionID": 13867,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Ceilings"
  },
  {
    "CriterionID": 11299,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows"
  },
  {
    "CriterionID": 12616,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows/Exterior & Interior Doors"
  },
  {
    "CriterionID": 12617,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows/Garage Doors"
  },
  {
    "CriterionID": 12613,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows/Windows"
  },
  {
    "CriterionID": 11139,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows/Windows/Window Repair"
  },
  {
    "CriterionID": 12614,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Doors & Windows/Windows/Window Screens & Outdoor Shutters"
  },
  {
    "CriterionID": 11294,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Drywall"
  },
  {
    "CriterionID": 11295,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Electrical Wiring"
  },
  {
    "CriterionID": 11286,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Exterior Siding"
  },
  {
    "CriterionID": 12585,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Exterior Siding/Stucco"
  },
  {
    "CriterionID": 12586,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Exterior Siding/Vinyl Siding"
  },
  {
    "CriterionID": 12587,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Exterior Siding/Wood Siding"
  },
  {
    "CriterionID": 11288,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring"
  },
  {
    "CriterionID": 12598,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Concrete Flooring"
  },
  {
    "CriterionID": 11136,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Flooring Installation"
  },
  {
    "CriterionID": 12599,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Laminate Flooring"
  },
  {
    "CriterionID": 12596,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Linoleum & Marmoleum Flooring"
  },
  {
    "CriterionID": 12594,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Rugs & Carpet"
  },
  {
    "CriterionID": 12593,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Stone Flooring"
  },
  {
    "CriterionID": 12600,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Vinyl Flooring"
  },
  {
    "CriterionID": 12595,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Flooring/Wood Flooring"
  },
  {
    "CriterionID": 11283,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Insulation"
  },
  {
    "CriterionID": 12425,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Materials & Supplies/Wood & Lumber"
  },
  {
    "CriterionID": 11138,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Painting Services"
  },
  {
    "CriterionID": 11151,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Building Restoration & Preservation"
  },
  {
    "CriterionID": 11133,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Chimney Services"
  },
  {
    "CriterionID": 11141,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Commercial & General Contracting"
  },
  {
    "CriterionID": 11154,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Construction Consulting"
  },
  {
    "CriterionID": 11145,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Construction Estimation"
  },
  {
    "CriterionID": 11276,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Construction Trailers"
  },
  {
    "CriterionID": 11297,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Decking Products & Equipment"
  },
  {
    "CriterionID": 11148,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Demolition Services"
  },
  {
    "CriterionID": 11275,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Earth Movers & Construction Tractors"
  },
  {
    "CriterionID": 13158,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Earth Movers & Construction Tractors/Back Hoe Loaders"
  },
  {
    "CriterionID": 12445,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Earth Movers & Construction Tractors/Skid Steer Loaders"
  },
  {
    "CriterionID": 13731,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Eco-Friendly Building & Construction"
  },
  {
    "CriterionID": 11143,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Electrician Services"
  },
  {
    "CriterionID": 11132,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Excavation Services"
  },
  {
    "CriterionID": 11284,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control"
  },
  {
    "CriterionID": 12582,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control/Air Conditioners"
  },
  {
    "CriterionID": 11147,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control/HVAC Service & Repair"
  },
  {
    "CriterionID": 12584,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control/Heaters & Furnaces"
  },
  {
    "CriterionID": 13803,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control/Residential Boilers"
  },
  {
    "CriterionID": 12583,
    "Category": "/Business & Industrial/Building Construction & Maintenance/HVAC & Climate Control/Ventilators"
  },
  {
    "CriterionID": 11277,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Handrails"
  },
  {
    "CriterionID": 11287,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories"
  },
  {
    "CriterionID": 13219,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Drills"
  },
  {
    "CriterionID": 13222,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hammers"
  },
  {
    "CriterionID": 12589,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories"
  },
  {
    "CriterionID": 13199,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Ball Bearings"
  },
  {
    "CriterionID": 13193,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Belts & Belting"
  },
  {
    "CriterionID": 13196,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Coils & Springs"
  },
  {
    "CriterionID": 13204,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Drill Bits"
  },
  {
    "CriterionID": 13200,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Fasteners & Hooks"
  },
  {
    "CriterionID": 13201,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Gaskets & Seals"
  },
  {
    "CriterionID": 13197,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Grommets"
  },
  {
    "CriterionID": 13203,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Hinges & Latches"
  },
  {
    "CriterionID": 13202,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Knobs"
  },
  {
    "CriterionID": 13198,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Mechanical Bushings"
  },
  {
    "CriterionID": 13195,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Nails"
  },
  {
    "CriterionID": 13194,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Power Tool Accessories"
  },
  {
    "CriterionID": 13319,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Hardware Accessories/Screws"
  },
  {
    "CriterionID": 12590,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools"
  },
  {
    "CriterionID": 13213,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Chainsaws"
  },
  {
    "CriterionID": 13207,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Grinders"
  },
  {
    "CriterionID": 13210,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Nailguns"
  },
  {
    "CriterionID": 13216,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Planers"
  },
  {
    "CriterionID": 13206,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Power Drills"
  },
  {
    "CriterionID": 13215,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Power Router"
  },
  {
    "CriterionID": 13212,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Power Saws"
  },
  {
    "CriterionID": 13675,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Power Saws/Band Saw"
  },
  {
    "CriterionID": 13321,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Power Saws/Table Saws"
  },
  {
    "CriterionID": 13211,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Rotary Tools"
  },
  {
    "CriterionID": 13208,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Sanders"
  },
  {
    "CriterionID": 13205,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Power Tools/Stud Sensors & Detectors"
  },
  {
    "CriterionID": 13218,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Riveters"
  },
  {
    "CriterionID": 13221,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Saws"
  },
  {
    "CriterionID": 13217,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Screwdrivers"
  },
  {
    "CriterionID": 13674,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Tool Belts"
  },
  {
    "CriterionID": 12592,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Tool Storage & Accessories"
  },
  {
    "CriterionID": 13823,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Woodworking Tools & Equipment"
  },
  {
    "CriterionID": 13220,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Hardware Tools & Accessories/Wrenches"
  },
  {
    "CriterionID": 11280,
    "Category": "/Business & Industrial/Building Construction & Maintenance/House Paints & Stains"
  },
  {
    "CriterionID": 11293,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting"
  },
  {
    "CriterionID": 11308,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting/Exit & Emergency Signs & Lights"
  },
  {
    "CriterionID": 12611,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting/Exterior Lighting"
  },
  {
    "CriterionID": 12610,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting/Interior Lighting"
  },
  {
    "CriterionID": 12612,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting/Lighting Fixtures"
  },
  {
    "CriterionID": 12609,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Installation Lighting/Track Lighting"
  },
  {
    "CriterionID": 11278,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Kitchen & Bathroom Counters"
  },
  {
    "CriterionID": 11150,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Landscaping & Landscape Design"
  },
  {
    "CriterionID": 11153,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Locks & Locksmiths"
  },
  {
    "CriterionID": 12417,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Locks & Locksmiths/Key Making & Copying"
  },
  {
    "CriterionID": 11292,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Masonry"
  },
  {
    "CriterionID": 12606,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Masonry/Bricks"
  },
  {
    "CriterionID": 12607,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Masonry/Cement & Concrete"
  },
  {
    "CriterionID": 11146,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Masonry/Concrete Mixing & Pouring"
  },
  {
    "CriterionID": 12608,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Masonry/Stone"
  },
  {
    "CriterionID": 13462,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing"
  },
  {
    "CriterionID": 12603,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Indoor Fire Sprinklers"
  },
  {
    "CriterionID": 12602,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures"
  },
  {
    "CriterionID": 13228,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures"
  },
  {
    "CriterionID": 13326,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures/Bathroom Faucets & Shower Heads"
  },
  {
    "CriterionID": 13325,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures/Bathtubs"
  },
  {
    "CriterionID": 13342,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures/Showers, Shower Doors & Enclosures"
  },
  {
    "CriterionID": 13328,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures/Sinks & Basins"
  },
  {
    "CriterionID": 13327,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Bathroom Fixtures/Toilets"
  },
  {
    "CriterionID": 13230,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Faucets"
  },
  {
    "CriterionID": 13229,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Kitchen Fixtures"
  },
  {
    "CriterionID": 13329,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Plumbing Fixtures/Kitchen Fixtures/Kitchen Faucets & Sprayers"
  },
  {
    "CriterionID": 12601,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories"
  },
  {
    "CriterionID": 13227,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories/Hoses"
  },
  {
    "CriterionID": 13224,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories/Pipe Fittings"
  },
  {
    "CriterionID": 13226,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories/Pipes, Tubes & Tubing"
  },
  {
    "CriterionID": 13225,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories/Plumbing Pumps"
  },
  {
    "CriterionID": 13223,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Pumps, Valves & Accessories/Valves"
  },
  {
    "CriterionID": 13191,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Water Heaters"
  },
  {
    "CriterionID": 12605,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Plumbing/Water Softeners"
  },
  {
    "CriterionID": 11279,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Prefabricated Buildings"
  },
  {
    "CriterionID": 11149,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Property Inspection & Coding"
  },
  {
    "CriterionID": 11298,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Rebar & Rebar Accessories"
  },
  {
    "CriterionID": 11285,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Roofing"
  },
  {
    "CriterionID": 11140,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Roofing/Roofing Installation & Repair"
  },
  {
    "CriterionID": 12597,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Tiles & Tiling"
  },
  {
    "CriterionID": 13848,
    "Category": "/Business & Industrial/Building Construction & Maintenance/Urban & Regional Planning"
  },
  {
    "CriterionID": 10276,
    "Category": "/Business & Industrial/Business Management"
  },
  {
    "CriterionID": 11088,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing"
  },
  {
    "CriterionID": 13412,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Classified Ads"
  },
  {
    "CriterionID": 12379,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Direct Marketing"
  },
  {
    "CriterionID": 12382,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Dubbing, Narration & Voice-Over"
  },
  {
    "CriterionID": 12376,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing"
  },
  {
    "CriterionID": 13153,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Affiliate Marketing"
  },
  {
    "CriterionID": 13154,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Email Marketing"
  },
  {
    "CriterionID": 13155,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Pay Per Click Marketing"
  },
  {
    "CriterionID": 13152,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Search Engine Marketing"
  },
  {
    "CriterionID": 13316,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Search Engine Marketing/Search Engine Optimization"
  },
  {
    "CriterionID": 13317,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Internet Marketing/Search Engine Marketing/Search Engine Paid Placement"
  },
  {
    "CriterionID": 13755,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Loyalty Cards & Programs"
  },
  {
    "CriterionID": 11101,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Mailing Lists & Email Newsletters"
  },
  {
    "CriterionID": 12381,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Market Research"
  },
  {
    "CriterionID": 13442,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Market Research/Surveys"
  },
  {
    "CriterionID": 13728,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Market Research/Surveys/Political Polls & Surveys"
  },
  {
    "CriterionID": 12378,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Marketing Consulting"
  },
  {
    "CriterionID": 12377,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Public Relations"
  },
  {
    "CriterionID": 12380,
    "Category": "/Business & Industrial/Business Management/Advertising & Marketing/Telemarketing"
  },
  {
    "CriterionID": 13411,
    "Category": "/Business & Industrial/Business Management/Business Opportunities"
  },
  {
    "CriterionID": 13762,
    "Category": "/Business & Industrial/Business Management/Business Opportunities/Home-Based Business Opportunities"
  },
  {
    "CriterionID": 13761,
    "Category": "/Business & Industrial/Business Management/Business Opportunities/MLM & Get Rich Quick Opportunities"
  },
  {
    "CriterionID": 11089,
    "Category": "/Business & Industrial/Business Management/Business Process Analysis"
  },
  {
    "CriterionID": 11096,
    "Category": "/Business & Industrial/Business Management/Business Security Investigation"
  },
  {
    "CriterionID": 11086,
    "Category": "/Business & Industrial/Business Management/Business Strategy Planning"
  },
  {
    "CriterionID": 11090,
    "Category": "/Business & Industrial/Business Management/Corporate Events"
  },
  {
    "CriterionID": 12386,
    "Category": "/Business & Industrial/Business Management/Corporate Events/Corporate Entertainment"
  },
  {
    "CriterionID": 12385,
    "Category": "/Business & Industrial/Business Management/Corporate Events/Corporate Event Planning"
  },
  {
    "CriterionID": 12384,
    "Category": "/Business & Industrial/Business Management/Corporate Events/Team Building"
  },
  {
    "CriterionID": 12383,
    "Category": "/Business & Industrial/Business Management/Corporate Events/Trade Fairs & Shows"
  },
  {
    "CriterionID": 11092,
    "Category": "/Business & Industrial/Business Management/Customer Support & Outreach"
  },
  {
    "CriterionID": 13854,
    "Category": "/Business & Industrial/Business Management/E-Commerce"
  },
  {
    "CriterionID": 11084,
    "Category": "/Business & Industrial/Business Management/Human Resources"
  },
  {
    "CriterionID": 12373,
    "Category": "/Business & Industrial/Business Management/Human Resources/Compensation & Benefits"
  },
  {
    "CriterionID": 12370,
    "Category": "/Business & Industrial/Business Management/Human Resources/Corporate Training"
  },
  {
    "CriterionID": 12374,
    "Category": "/Business & Industrial/Business Management/Human Resources/Employee Relations"
  },
  {
    "CriterionID": 12369,
    "Category": "/Business & Industrial/Business Management/Human Resources/Outsourcing & Outplacement"
  },
  {
    "CriterionID": 12372,
    "Category": "/Business & Industrial/Business Management/Human Resources/Payroll Services"
  },
  {
    "CriterionID": 12371,
    "Category": "/Business & Industrial/Business Management/Human Resources/Recruiting & Retention"
  },
  {
    "CriterionID": 11085,
    "Category": "/Business & Industrial/Business Management/Mail Order Services"
  },
  {
    "CriterionID": 11098,
    "Category": "/Business & Industrial/Business Management/Management Consulting"
  },
  {
    "CriterionID": 11099,
    "Category": "/Business & Industrial/Business Management/Office & Facilities Management"
  },
  {
    "CriterionID": 12397,
    "Category": "/Business & Industrial/Business Management/Office & Facilities Management/Document Management"
  },
  {
    "CriterionID": 12396,
    "Category": "/Business & Industrial/Business Management/Office & Facilities Management/Document Shredding & Destruction"
  },
  {
    "CriterionID": 12398,
    "Category": "/Business & Industrial/Business Management/Office & Facilities Management/Mail Processing"
  },
  {
    "CriterionID": 12399,
    "Category": "/Business & Industrial/Business Management/Office & Facilities Management/Office Automation"
  },
  {
    "CriterionID": 11095,
    "Category": "/Business & Industrial/Business Management/Physical Asset Management"
  },
  {
    "CriterionID": 11097,
    "Category": "/Business & Industrial/Business Management/Supply Chain Management"
  },
  {
    "CriterionID": 11094,
    "Category": "/Business & Industrial/Business Management/Technology Consulting"
  },
  {
    "CriterionID": 11100,
    "Category": "/Business & Industrial/Business Management/Transcription"
  },
  {
    "CriterionID": 13491,
    "Category": "/Business & Industrial/Chemical Industry"
  },
  {
    "CriterionID": 12345,
    "Category": "/Business & Industrial/Chemical Industry/Biochemistry"
  },
  {
    "CriterionID": 11250,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products"
  },
  {
    "CriterionID": 12548,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Absorbents"
  },
  {
    "CriterionID": 12557,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Additives"
  },
  {
    "CriterionID": 12559,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Agents & Reagents"
  },
  {
    "CriterionID": 12551,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Chemical Adhesives"
  },
  {
    "CriterionID": 12550,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Chemical Removers & Solvents"
  },
  {
    "CriterionID": 12553,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Desiccants"
  },
  {
    "CriterionID": 12558,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Dyestuffs & Inks"
  },
  {
    "CriterionID": 12555,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Industrial Protectants & Sealers"
  },
  {
    "CriterionID": 12556,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Lubricants"
  },
  {
    "CriterionID": 13189,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Lubricants/Industrial Lubricants"
  },
  {
    "CriterionID": 13188,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Lubricants/Vehicle Lubricants"
  },
  {
    "CriterionID": 12549,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Paint Thinners"
  },
  {
    "CriterionID": 12547,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Plastics & Rubber"
  },
  {
    "CriterionID": 12546,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Refrigerants"
  },
  {
    "CriterionID": 11191,
    "Category": "/Business & Industrial/Chemical Industry/Chemicals & Chemical Products/Resins"
  },
  {
    "CriterionID": 11163,
    "Category": "/Business & Industrial/Chemical Industry/Food Science"
  },
  {
    "CriterionID": 10307,
    "Category": "/Business & Industrial/Commercial & Industrial Printing"
  },
  {
    "CriterionID": 11169,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Book Printing"
  },
  {
    "CriterionID": 11392,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/CD & DVD Duplication & Printing"
  },
  {
    "CriterionID": 11168,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Check Printing"
  },
  {
    "CriterionID": 11397,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Large Format Printers"
  },
  {
    "CriterionID": 11396,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Pad Printing"
  },
  {
    "CriterionID": 12708,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Printing Presses"
  },
  {
    "CriterionID": 11171,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/Screen Printing"
  },
  {
    "CriterionID": 11394,
    "Category": "/Business & Industrial/Commercial & Industrial Printing/UV Curing"
  },
  {
    "CriterionID": 10273,
    "Category": "/Business & Industrial/Design & Engineering"
  },
  {
    "CriterionID": 11130,
    "Category": "/Business & Industrial/Design & Engineering/Architecture"
  },
  {
    "CriterionID": 12416,
    "Category": "/Business & Industrial/Design & Engineering/Architecture/Architectural Engineering"
  },
  {
    "CriterionID": 13868,
    "Category": "/Business & Industrial/Design & Engineering/Civil Engineering"
  },
  {
    "CriterionID": 11367,
    "Category": "/Business & Industrial/Design & Engineering/Drafting Boards & Tables"
  },
  {
    "CriterionID": 11369,
    "Category": "/Business & Industrial/Design & Engineering/Drafting Equipment"
  },
  {
    "CriterionID": 11069,
    "Category": "/Business & Industrial/Design & Engineering/Drafting Services"
  },
  {
    "CriterionID": 11068,
    "Category": "/Business & Industrial/Design & Engineering/Graphic Design"
  },
  {
    "CriterionID": 13733,
    "Category": "/Business & Industrial/Design & Engineering/Industrial & Product Design"
  },
  {
    "CriterionID": 13732,
    "Category": "/Business & Industrial/Design & Engineering/Industrial & Systems Engineering"
  },
  {
    "CriterionID": 13734,
    "Category": "/Business & Industrial/Design & Engineering/Interior Design"
  },
  {
    "CriterionID": 10295,
    "Category": "/Business & Industrial/Energy Industry"
  },
  {
    "CriterionID": 11176,
    "Category": "/Business & Industrial/Energy Industry/Energy Consulting"
  },
  {
    "CriterionID": 11173,
    "Category": "/Business & Industrial/Energy Industry/Energy Management"
  },
  {
    "CriterionID": 13603,
    "Category": "/Business & Industrial/Energy Industry/Energy Management/Energy Audits & Assessments"
  },
  {
    "CriterionID": 11174,
    "Category": "/Business & Industrial/Energy Industry/Energy Price Comparison"
  },
  {
    "CriterionID": 11175,
    "Category": "/Business & Industrial/Energy Industry/Energy Research"
  },
  {
    "CriterionID": 11263,
    "Category": "/Business & Industrial/Energy Industry/Generators"
  },
  {
    "CriterionID": 11259,
    "Category": "/Business & Industrial/Energy Industry/Industrial Magnets"
  },
  {
    "CriterionID": 12113,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas"
  },
  {
    "CriterionID": 11261,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel"
  },
  {
    "CriterionID": 12569,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Biofuel"
  },
  {
    "CriterionID": 13346,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Biofuel/Biodiesel"
  },
  {
    "CriterionID": 13190,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Biofuel/Ethanol"
  },
  {
    "CriterionID": 12570,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Gasoline"
  },
  {
    "CriterionID": 12572,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Natural Gas"
  },
  {
    "CriterionID": 12571,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel/Propane"
  },
  {
    "CriterionID": 11257,
    "Category": "/Business & Industrial/Energy Industry/Oil & Gas/Fuel Cells"
  },
  {
    "CriterionID": 12110,
    "Category": "/Business & Industrial/Energy Industry/Renewable & Alternative Energy"
  },
  {
    "CriterionID": 11262,
    "Category": "/Business & Industrial/Energy Industry/Renewable & Alternative Energy/Solar Power"
  },
  {
    "CriterionID": 12574,
    "Category": "/Business & Industrial/Energy Industry/Renewable & Alternative Energy/Solar Power/Solar Chargers"
  },
  {
    "CriterionID": 12573,
    "Category": "/Business & Industrial/Energy Industry/Renewable & Alternative Energy/Solar Power/Solar Panels"
  },
  {
    "CriterionID": 13838,
    "Category": "/Business & Industrial/Energy Industry/Renewable & Alternative Energy/Wind Power"
  },
  {
    "CriterionID": 11388,
    "Category": "/Business & Industrial/Energy Industry/Waste Management"
  },
  {
    "CriterionID": 12706,
    "Category": "/Business & Industrial/Energy Industry/Waste Management/Recycling"
  },
  {
    "CriterionID": 13676,
    "Category": "/Business & Industrial/Fishing Industry"
  },
  {
    "CriterionID": 13677,
    "Category": "/Business & Industrial/Fishing Industry/Commercial Fishing"
  },
  {
    "CriterionID": 13844,
    "Category": "/Business & Industrial/Food Production"
  },
  {
    "CriterionID": 10301,
    "Category": "/Business & Industrial/Food Service Industry"
  },
  {
    "CriterionID": 11340,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies"
  },
  {
    "CriterionID": 12651,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies/Beverage, Bar & Wineware"
  },
  {
    "CriterionID": 13835,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies/Beverage, Bar & Wineware/Mugs & Cups"
  },
  {
    "CriterionID": 13331,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies/Beverage, Bar & Wineware/Wine Glasses"
  },
  {
    "CriterionID": 13330,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies/Beverage, Bar & Wineware/Wine Openers & Accessories"
  },
  {
    "CriterionID": 12646,
    "Category": "/Business & Industrial/Food Service Industry/Beverage & Bar Supplies/Cold Beverage Dispensers"
  },
  {
    "CriterionID": 11485,
    "Category": "/Business & Industrial/Food Service Industry/Catering & Bartending"
  },
  {
    "CriterionID": 11347,
    "Category": "/Business & Industrial/Food Service Industry/Chafing Dishes"
  },
  {
    "CriterionID": 11345,
    "Category": "/Business & Industrial/Food Service Industry/Commercial Food Preparation Equipment"
  },
  {
    "CriterionID": 11346,
    "Category": "/Business & Industrial/Food Service Industry/Concession Equipment"
  },
  {
    "CriterionID": 12052,
    "Category": "/Business & Industrial/Food Service Industry/Culinary Schools & Courses"
  },
  {
    "CriterionID": 11341,
    "Category": "/Business & Industrial/Food Service Industry/Dish Dispensers"
  },
  {
    "CriterionID": 11160,
    "Category": "/Business & Industrial/Food Service Industry/Food Consulting"
  },
  {
    "CriterionID": 11352,
    "Category": "/Business & Industrial/Food Service Industry/Food Display Cases"
  },
  {
    "CriterionID": 11162,
    "Category": "/Business & Industrial/Food Service Industry/Food Distribution"
  },
  {
    "CriterionID": 11159,
    "Category": "/Business & Industrial/Food Service Industry/Food Import & Export"
  },
  {
    "CriterionID": 11161,
    "Category": "/Business & Industrial/Food Service Industry/Food Marketing"
  },
  {
    "CriterionID": 11156,
    "Category": "/Business & Industrial/Food Service Industry/Food Packing & Bottling"
  },
  {
    "CriterionID": 11354,
    "Category": "/Business & Industrial/Food Service Industry/Food Scales"
  },
  {
    "CriterionID": 11353,
    "Category": "/Business & Industrial/Food Service Industry/Food Transport Carts"
  },
  {
    "CriterionID": 11348,
    "Category": "/Business & Industrial/Food Service Industry/Ice Machines"
  },
  {
    "CriterionID": 11355,
    "Category": "/Business & Industrial/Food Service Industry/Industrial Food Storage"
  },
  {
    "CriterionID": 11343,
    "Category": "/Business & Industrial/Food Service Industry/Industrial Refrigeration"
  },
  {
    "CriterionID": 11155,
    "Category": "/Business & Industrial/Food Service Industry/Restaurant Suppliers"
  },
  {
    "CriterionID": 11344,
    "Category": "/Business & Industrial/Food Service Industry/Salad & Cold Food Bars"
  },
  {
    "CriterionID": 11342,
    "Category": "/Business & Industrial/Food Service Industry/Steam Tables & Food Warmers"
  },
  {
    "CriterionID": 11349,
    "Category": "/Business & Industrial/Food Service Industry/Work & Dish Tables"
  },
  {
    "CriterionID": 13841,
    "Category": "/Business & Industrial/Import & Export"
  },
  {
    "CriterionID": 13464,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing"
  },
  {
    "CriterionID": 10302,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics"
  },
  {
    "CriterionID": 11359,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components"
  },
  {
    "CriterionID": 12680,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Attenuators"
  },
  {
    "CriterionID": 12679,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Capacitors"
  },
  {
    "CriterionID": 12688,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Circuit Boards"
  },
  {
    "CriterionID": 12686,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Circuit Breakers"
  },
  {
    "CriterionID": 13845,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electrical Transformers"
  },
  {
    "CriterionID": 12699,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Chips"
  },
  {
    "CriterionID": 12694,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Circuits"
  },
  {
    "CriterionID": 12685,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Connectors & Terminals"
  },
  {
    "CriterionID": 12698,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Converters"
  },
  {
    "CriterionID": 12684,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Decoders & Encoders"
  },
  {
    "CriterionID": 12676,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Filters"
  },
  {
    "CriterionID": 12677,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Fuses & Fuseblocks"
  },
  {
    "CriterionID": 12691,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Inductors"
  },
  {
    "CriterionID": 12693,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Multiplexers"
  },
  {
    "CriterionID": 12692,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Oscillators"
  },
  {
    "CriterionID": 12690,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Resistors"
  },
  {
    "CriterionID": 12682,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Sockets"
  },
  {
    "CriterionID": 12681,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Terminal Blocks"
  },
  {
    "CriterionID": 12697,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Transistors"
  },
  {
    "CriterionID": 12696,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Electronic Transmitters"
  },
  {
    "CriterionID": 12683,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Potentiometers & Rheostats"
  },
  {
    "CriterionID": 12695,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Semiconductor Devices"
  },
  {
    "CriterionID": 12687,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Thermistors"
  },
  {
    "CriterionID": 12675,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Thermocouples"
  },
  {
    "CriterionID": 12689,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Transceivers"
  },
  {
    "CriterionID": 12678,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Components/Transducers"
  },
  {
    "CriterionID": 11363,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Consoles & Enclosures"
  },
  {
    "CriterionID": 11360,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Test & Measurement Equipment"
  },
  {
    "CriterionID": 11358,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Electronic Wires & Tubing"
  },
  {
    "CriterionID": 11361,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Industrial Control Starters"
  },
  {
    "CriterionID": 11362,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Industrial Electronic Fans"
  },
  {
    "CriterionID": 11357,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Industrial Electronic Power Supplies"
  },
  {
    "CriterionID": 11356,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Optoelectronic & Fiber Electronic Products"
  },
  {
    "CriterionID": 11364,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Electronics/Proximity Sensors"
  },
  {
    "CriterionID": 10281,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing"
  },
  {
    "CriterionID": 11118,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Contract Manufacturing & Outsourcing"
  },
  {
    "CriterionID": 11128,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Brazing"
  },
  {
    "CriterionID": 11109,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Coating"
  },
  {
    "CriterionID": 11124,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Cutting"
  },
  {
    "CriterionID": 11108,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Drilling"
  },
  {
    "CriterionID": 11111,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Embossing & Engraving"
  },
  {
    "CriterionID": 12517,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Embossing & Engraving/Marking Devices"
  },
  {
    "CriterionID": 11121,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Filling"
  },
  {
    "CriterionID": 11119,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Finishing"
  },
  {
    "CriterionID": 11113,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Forming"
  },
  {
    "CriterionID": 11114,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Forming/Injection Molding"
  },
  {
    "CriterionID": 11115,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Forming/Thermoforming"
  },
  {
    "CriterionID": 11120,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Grinding"
  },
  {
    "CriterionID": 11117,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing"
  },
  {
    "CriterionID": 11238,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment"
  },
  {
    "CriterionID": 12497,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Actuators"
  },
  {
    "CriterionID": 12524,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Autoclaves & Sterilizers"
  },
  {
    "CriterionID": 12496,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Cargo Carriers"
  },
  {
    "CriterionID": 12519,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Chemical Reactors"
  },
  {
    "CriterionID": 12522,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Conveyors & Conveyor Parts"
  },
  {
    "CriterionID": 12521,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Dampers"
  },
  {
    "CriterionID": 12512,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Dehumidifiers"
  },
  {
    "CriterionID": 12516,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Dehydrators"
  },
  {
    "CriterionID": 12515,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Distilling Equipment"
  },
  {
    "CriterionID": 12514,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Dollies"
  },
  {
    "CriterionID": 11384,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Elevators & Lifts"
  },
  {
    "CriterionID": 12504,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Evaporators"
  },
  {
    "CriterionID": 12508,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Heat Exchangers & Pumps"
  },
  {
    "CriterionID": 12510,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Heat Sinks"
  },
  {
    "CriterionID": 12498,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Heat Treating Equipment"
  },
  {
    "CriterionID": 12518,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Hoists & Winches"
  },
  {
    "CriterionID": 12523,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial & Protective Cases"
  },
  {
    "CriterionID": 12501,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Benches & Tables"
  },
  {
    "CriterionID": 12525,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Boilers"
  },
  {
    "CriterionID": 12509,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Burners"
  },
  {
    "CriterionID": 12505,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Carts"
  },
  {
    "CriterionID": 12506,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Crushers & Compactors"
  },
  {
    "CriterionID": 12511,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Kilns"
  },
  {
    "CriterionID": 12513,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Industrial Storage Containers"
  },
  {
    "CriterionID": 12502,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Lifting Jacks"
  },
  {
    "CriterionID": 12499,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Pallets"
  },
  {
    "CriterionID": 12507,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Reclaimers"
  },
  {
    "CriterionID": 12520,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Refractory Equipment"
  },
  {
    "CriterionID": 12503,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Handling & Processing/Industrial Handling & Processing Equipment/Vats"
  },
  {
    "CriterionID": 11125,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Heat Sealing & Treating"
  },
  {
    "CriterionID": 11126,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Lubrication"
  },
  {
    "CriterionID": 11123,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Measurement & Control"
  },
  {
    "CriterionID": 11129,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Slitting"
  },
  {
    "CriterionID": 11127,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Storage"
  },
  {
    "CriterionID": 10293,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment"
  },
  {
    "CriterionID": 11248,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Air Compressors"
  },
  {
    "CriterionID": 11242,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Applicators & Dispensers"
  },
  {
    "CriterionID": 11245,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Bellows"
  },
  {
    "CriterionID": 11243,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Dies & Molds"
  },
  {
    "CriterionID": 11240,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Drill Presses"
  },
  {
    "CriterionID": 11244,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Abrasives"
  },
  {
    "CriterionID": 11249,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Blowers"
  },
  {
    "CriterionID": 11247,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Cutting Equipment"
  },
  {
    "CriterionID": 12544,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Cutting Equipment/Industrial Chainsaws"
  },
  {
    "CriterionID": 12543,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Cutting Equipment/Industrial Tablesaws"
  },
  {
    "CriterionID": 11246,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Grinders"
  },
  {
    "CriterionID": 13763,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Lasers"
  },
  {
    "CriterionID": 11239,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Lubricators"
  },
  {
    "CriterionID": 11241,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment"
  },
  {
    "CriterionID": 12531,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Accelerometers"
  },
  {
    "CriterionID": 12532,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Alignment & Calibration"
  },
  {
    "CriterionID": 13187,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Alignment & Calibration/Laser Alignment"
  },
  {
    "CriterionID": 12526,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Anemometers"
  },
  {
    "CriterionID": 12535,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Borescopes"
  },
  {
    "CriterionID": 12530,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Comparators"
  },
  {
    "CriterionID": 12533,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Dynamometers"
  },
  {
    "CriterionID": 12528,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Flowmeters"
  },
  {
    "CriterionID": 12527,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Gauges"
  },
  {
    "CriterionID": 13186,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Gauges/Micrometer Screw Gauges"
  },
  {
    "CriterionID": 12529,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Industrial Scales"
  },
  {
    "CriterionID": 12536,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Industrial Thermometers"
  },
  {
    "CriterionID": 12541,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Industrial Thermostats"
  },
  {
    "CriterionID": 12538,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Limiters"
  },
  {
    "CriterionID": 12537,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Pyrometers"
  },
  {
    "CriterionID": 12534,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Regulators"
  },
  {
    "CriterionID": 12540,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Tachometers"
  },
  {
    "CriterionID": 12539,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Industrial Tools & Equipment/Industrial Measurement & Control Equipment/Test Probes"
  },
  {
    "CriterionID": 11110,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Laser Marking"
  },
  {
    "CriterionID": 11122,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking"
  },
  {
    "CriterionID": 11196,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/I-Beams"
  },
  {
    "CriterionID": 12415,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Industrial Forging"
  },
  {
    "CriterionID": 11197,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Alloys"
  },
  {
    "CriterionID": 12446,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Alloys/Carbide & Carbide Products"
  },
  {
    "CriterionID": 12409,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Casting, Molding & Machining"
  },
  {
    "CriterionID": 12414,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Fabrication"
  },
  {
    "CriterionID": 12407,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Plating & Finishing"
  },
  {
    "CriterionID": 12411,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metal Stamping"
  },
  {
    "CriterionID": 12408,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metallurgical Engineering"
  },
  {
    "CriterionID": 11201,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Metalworking Tools"
  },
  {
    "CriterionID": 11204,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Scrap Metal"
  },
  {
    "CriterionID": 11200,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Sheet & Plate Metal"
  },
  {
    "CriterionID": 11195,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Steel Angles & Channels"
  },
  {
    "CriterionID": 12413,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Welding"
  },
  {
    "CriterionID": 12456,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Metalworking/Welding/Welding Tools & Equipment"
  },
  {
    "CriterionID": 12410,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Mining"
  },
  {
    "CriterionID": 10291,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Mining/Mine Working Products & Equipment"
  },
  {
    "CriterionID": 11112,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Industrial Manufacturing/Product Assembly"
  },
  {
    "CriterionID": 11198,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals"
  },
  {
    "CriterionID": 12450,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Aluminum"
  },
  {
    "CriterionID": 12455,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Brass"
  },
  {
    "CriterionID": 12452,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Bronze"
  },
  {
    "CriterionID": 12448,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Cobalt"
  },
  {
    "CriterionID": 12447,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Copper"
  },
  {
    "CriterionID": 12454,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Powdered Metals"
  },
  {
    "CriterionID": 12449,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Precious Metals"
  },
  {
    "CriterionID": 13163,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Precious Metals/Gold"
  },
  {
    "CriterionID": 13164,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Precious Metals/Platinum"
  },
  {
    "CriterionID": 13162,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Precious Metals/Silver"
  },
  {
    "CriterionID": 12451,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Steel"
  },
  {
    "CriterionID": 12453,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Metals/Tin"
  },
  {
    "CriterionID": 11202,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Minerals"
  },
  {
    "CriterionID": 11067,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Occupational Health & Safety"
  },
  {
    "CriterionID": 11383,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Occupational Health & Safety/Hazardous Material Control"
  },
  {
    "CriterionID": 13746,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Occupational Health & Safety/Industrial Safety Supplies & Equipment"
  },
  {
    "CriterionID": 10306,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility"
  },
  {
    "CriterionID": 11390,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility/Acoustic Materials & Noise Control"
  },
  {
    "CriterionID": 11387,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility/Air Handling"
  },
  {
    "CriterionID": 11386,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility/Building Automation"
  },
  {
    "CriterionID": 11182,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility/Environmental Control"
  },
  {
    "CriterionID": 12566,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Plant & Facility/Robotics & Factory Automation"
  },
  {
    "CriterionID": 10298,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Textiles & Textile Services"
  },
  {
    "CriterionID": 11303,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Textiles & Textile Services/Feathers & Down"
  },
  {
    "CriterionID": 11300,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Textiles & Textile Services/Leather & Fur"
  },
  {
    "CriterionID": 11060,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Textiles & Textile Services/Textile Manufacturing"
  },
  {
    "CriterionID": 11116,
    "Category": "/Business & Industrial/Industrial Goods & Manufacturing/Textiles & Textile Services/Textile Spinning"
  },
  {
    "CriterionID": 10308,
    "Category": "/Business & Industrial/Janitorial Products & Services"
  },
  {
    "CriterionID": 11401,
    "Category": "/Business & Industrial/Janitorial Products & Services/Electric Hand Dryers"
  },
  {
    "CriterionID": 11400,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning"
  },
  {
    "CriterionID": 12716,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Automatic Floor Scrubbers"
  },
  {
    "CriterionID": 12718,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Carpet Fans"
  },
  {
    "CriterionID": 11409,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Industrial Brooms & Brushes"
  },
  {
    "CriterionID": 12717,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Industrial Floor Burnishers & Polishers"
  },
  {
    "CriterionID": 11405,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Industrial Mops & Mop Buckets"
  },
  {
    "CriterionID": 12715,
    "Category": "/Business & Industrial/Janitorial Products & Services/Floor Cleaning/Industrial Vacuum Cleaners"
  },
  {
    "CriterionID": 11402,
    "Category": "/Business & Industrial/Janitorial Products & Services/Janitorial Carts"
  },
  {
    "CriterionID": 11398,
    "Category": "/Business & Industrial/Janitorial Products & Services/Janitorial Signs"
  },
  {
    "CriterionID": 12710,
    "Category": "/Business & Industrial/Janitorial Products & Services/Janitorial Signs/ADA Signs"
  },
  {
    "CriterionID": 12709,
    "Category": "/Business & Industrial/Janitorial Products & Services/Janitorial Signs/Wet Floor Signs"
  },
  {
    "CriterionID": 11406,
    "Category": "/Business & Industrial/Janitorial Products & Services/Odor Control Devices"
  },
  {
    "CriterionID": 11408,
    "Category": "/Business & Industrial/Janitorial Products & Services/Soap Dispensers"
  },
  {
    "CriterionID": 11399,
    "Category": "/Business & Industrial/Janitorial Products & Services/Touch-Free Devices"
  },
  {
    "CriterionID": 12713,
    "Category": "/Business & Industrial/Janitorial Products & Services/Touch-Free Devices/Automatic Faucets"
  },
  {
    "CriterionID": 12712,
    "Category": "/Business & Industrial/Janitorial Products & Services/Touch-Free Devices/Automatic Flush Valves"
  },
  {
    "CriterionID": 12711,
    "Category": "/Business & Industrial/Janitorial Products & Services/Touch-Free Devices/Automatic Soap Dispensers"
  },
  {
    "CriterionID": 12714,
    "Category": "/Business & Industrial/Janitorial Products & Services/Touch-Free Devices/Automatic Towel Dispensers"
  },
  {
    "CriterionID": 11407,
    "Category": "/Business & Industrial/Janitorial Products & Services/Towel Dispensers"
  },
  {
    "CriterionID": 11403,
    "Category": "/Business & Industrial/Janitorial Products & Services/Urinal Supplies"
  },
  {
    "CriterionID": 11404,
    "Category": "/Business & Industrial/Janitorial Products & Services/Waste Receptacles"
  },
  {
    "CriterionID": 13804,
    "Category": "/Business & Industrial/Manufacturing"
  },
  {
    "CriterionID": 10271,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing"
  },
  {
    "CriterionID": 11056,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Apparel Manufacturing"
  },
  {
    "CriterionID": 11055,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Auto Industry & Vehicle Manufacturing"
  },
  {
    "CriterionID": 11061,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Consumer Electronics Manufacturing"
  },
  {
    "CriterionID": 11058,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Furniture Manufacturing"
  },
  {
    "CriterionID": 11059,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Home Appliance Manufacturing"
  },
  {
    "CriterionID": 13814,
    "Category": "/Business & Industrial/Manufacturing/Consumer Goods Manufacturing/Plaques, Awards & Trophies"
  },
  {
    "CriterionID": 10300,
    "Category": "/Business & Industrial/Office"
  },
  {
    "CriterionID": 11338,
    "Category": "/Business & Industrial/Office/Binders, Binding & Laminating"
  },
  {
    "CriterionID": 11325,
    "Category": "/Business & Industrial/Office/Business Cards, Stationery & Forms"
  },
  {
    "CriterionID": 11328,
    "Category": "/Business & Industrial/Office/Calculators"
  },
  {
    "CriterionID": 11334,
    "Category": "/Business & Industrial/Office/Calendars & Planners"
  },
  {
    "CriterionID": 12580,
    "Category": "/Business & Industrial/Office/Calendars & Planners/Calendar & Scheduling Software"
  },
  {
    "CriterionID": 11332,
    "Category": "/Business & Industrial/Office/Desk Organizers"
  },
  {
    "CriterionID": 11329,
    "Category": "/Business & Industrial/Office/Glue & Paste"
  },
  {
    "CriterionID": 11336,
    "Category": "/Business & Industrial/Office/Labels & Labeling"
  },
  {
    "CriterionID": 11324,
    "Category": "/Business & Industrial/Office/Lanyards & Badge Holders"
  },
  {
    "CriterionID": 11337,
    "Category": "/Business & Industrial/Office/Microcassette Recorders"
  },
  {
    "CriterionID": 11339,
    "Category": "/Business & Industrial/Office/Office Appliances"
  },
  {
    "CriterionID": 12638,
    "Category": "/Business & Industrial/Office/Office Appliances/Copiers"
  },
  {
    "CriterionID": 12640,
    "Category": "/Business & Industrial/Office/Office Appliances/Desktop Printers"
  },
  {
    "CriterionID": 13235,
    "Category": "/Business & Industrial/Office/Office Appliances/Desktop Printers/Inkjet Printers"
  },
  {
    "CriterionID": 13233,
    "Category": "/Business & Industrial/Office/Office Appliances/Desktop Printers/Laser Printers"
  },
  {
    "CriterionID": 13236,
    "Category": "/Business & Industrial/Office/Office Appliances/Desktop Printers/Multi-Function Printers"
  },
  {
    "CriterionID": 13234,
    "Category": "/Business & Industrial/Office/Office Appliances/Desktop Printers/Photo Printers"
  },
  {
    "CriterionID": 12641,
    "Category": "/Business & Industrial/Office/Office Appliances/Electronic Whiteboards"
  },
  {
    "CriterionID": 12637,
    "Category": "/Business & Industrial/Office/Office Appliances/Fax Machines & Accessories"
  },
  {
    "CriterionID": 12642,
    "Category": "/Business & Industrial/Office/Office Appliances/Overhead Projectors"
  },
  {
    "CriterionID": 12639,
    "Category": "/Business & Industrial/Office/Office Appliances/Paper Shredders"
  },
  {
    "CriterionID": 11323,
    "Category": "/Business & Industrial/Office/Office Furniture"
  },
  {
    "CriterionID": 12635,
    "Category": "/Business & Industrial/Office/Office Furniture/Bookcases & Shelving"
  },
  {
    "CriterionID": 12630,
    "Category": "/Business & Industrial/Office/Office Furniture/Cubicle Walls & Panels"
  },
  {
    "CriterionID": 12634,
    "Category": "/Business & Industrial/Office/Office Furniture/Desk Lamps & Table Lamps"
  },
  {
    "CriterionID": 12632,
    "Category": "/Business & Industrial/Office/Office Furniture/Filing Cabinets"
  },
  {
    "CriterionID": 12631,
    "Category": "/Business & Industrial/Office/Office Furniture/Office & Computer Desks"
  },
  {
    "CriterionID": 12633,
    "Category": "/Business & Industrial/Office/Office Furniture/Task Chairs"
  },
  {
    "CriterionID": 11305,
    "Category": "/Business & Industrial/Office/Paper"
  },
  {
    "CriterionID": 11326,
    "Category": "/Business & Industrial/Office/Paper Clips & Rubber Bands"
  },
  {
    "CriterionID": 11370,
    "Category": "/Business & Industrial/Office/Pens & Writing Instruments"
  },
  {
    "CriterionID": 11333,
    "Category": "/Business & Industrial/Office/Portfolios & Presentation Cases"
  },
  {
    "CriterionID": 11335,
    "Category": "/Business & Industrial/Office/Printer Accessories"
  },
  {
    "CriterionID": 11330,
    "Category": "/Business & Industrial/Office/Staplers, Scissors & Punchers"
  },
  {
    "CriterionID": 10290,
    "Category": "/Business & Industrial/Retail Trade"
  },
  {
    "CriterionID": 11210,
    "Category": "/Business & Industrial/Retail Trade/Apparel Retail Supplies"
  },
  {
    "CriterionID": 12466,
    "Category": "/Business & Industrial/Retail Trade/Apparel Retail Supplies/Clothing & Accessory Hangers"
  },
  {
    "CriterionID": 12468,
    "Category": "/Business & Industrial/Retail Trade/Apparel Retail Supplies/Mannequins"
  },
  {
    "CriterionID": 11227,
    "Category": "/Business & Industrial/Retail Trade/Ash Tray Receptacles"
  },
  {
    "CriterionID": 11208,
    "Category": "/Business & Industrial/Retail Trade/Bar Code Scanners"
  },
  {
    "CriterionID": 11207,
    "Category": "/Business & Industrial/Retail Trade/Bill & Coin Counters"
  },
  {
    "CriterionID": 11380,
    "Category": "/Business & Industrial/Retail Trade/CD & DVD Jewelboxes & Cases"
  },
  {
    "CriterionID": 11233,
    "Category": "/Business & Industrial/Retail Trade/Cash Registers & Cash Register Supplies"
  },
  {
    "CriterionID": 11224,
    "Category": "/Business & Industrial/Retail Trade/Counterfeit Money Detectors"
  },
  {
    "CriterionID": 11216,
    "Category": "/Business & Industrial/Retail Trade/Floor Mats"
  },
  {
    "CriterionID": 11206,
    "Category": "/Business & Industrial/Retail Trade/Hand Trucks & Utility Carts"
  },
  {
    "CriterionID": 11181,
    "Category": "/Business & Industrial/Retail Trade/Inventorying"
  },
  {
    "CriterionID": 11230,
    "Category": "/Business & Industrial/Retail Trade/Jewelry Bags, Boxes & Displays"
  },
  {
    "CriterionID": 11178,
    "Category": "/Business & Industrial/Retail Trade/Loss Prevention"
  },
  {
    "CriterionID": 11232,
    "Category": "/Business & Industrial/Retail Trade/Merchant Point-of-Sale Systems"
  },
  {
    "CriterionID": 11180,
    "Category": "/Business & Industrial/Retail Trade/Merchant Services & Payment Systems"
  },
  {
    "CriterionID": 11211,
    "Category": "/Business & Industrial/Retail Trade/Paper & Plastic Bags"
  },
  {
    "CriterionID": 11214,
    "Category": "/Business & Industrial/Retail Trade/Pegboard & Slatwall"
  },
  {
    "CriterionID": 11219,
    "Category": "/Business & Industrial/Retail Trade/Retail Display Supplies"
  },
  {
    "CriterionID": 12475,
    "Category": "/Business & Industrial/Retail Trade/Retail Display Supplies/Display Racks & Cases"
  },
  {
    "CriterionID": 12471,
    "Category": "/Business & Industrial/Retail Trade/Retail Display Supplies/Kiosks"
  },
  {
    "CriterionID": 11205,
    "Category": "/Business & Industrial/Retail Trade/Retail Signs & Banners"
  },
  {
    "CriterionID": 12459,
    "Category": "/Business & Industrial/Retail Trade/Retail Signs & Banners/LED Signs"
  },
  {
    "CriterionID": 12458,
    "Category": "/Business & Industrial/Retail Trade/Retail Signs & Banners/Neon Signs"
  },
  {
    "CriterionID": 12460,
    "Category": "/Business & Industrial/Retail Trade/Retail Signs & Banners/Open & Closed Signs"
  },
  {
    "CriterionID": 12462,
    "Category": "/Business & Industrial/Retail Trade/Retail Signs & Banners/Sign Holders & Easels"
  },
  {
    "CriterionID": 11231,
    "Category": "/Business & Industrial/Retail Trade/Shopping Baskets & Carts"
  },
  {
    "CriterionID": 11217,
    "Category": "/Business & Industrial/Retail Trade/Shrink Wrapping Systems"
  },
  {
    "CriterionID": 11229,
    "Category": "/Business & Industrial/Retail Trade/Tagging Guns"
  },
  {
    "CriterionID": 11220,
    "Category": "/Business & Industrial/Retail Trade/Time Clocks & Time Cards"
  },
  {
    "CriterionID": 11209,
    "Category": "/Business & Industrial/Retail Trade/Turnstiles & Traffic Control Devices"
  },
  {
    "CriterionID": 11179,
    "Category": "/Business & Industrial/Retail Trade/Vending"
  },
  {
    "CriterionID": 11228,
    "Category": "/Business & Industrial/Retail Trade/Vending/Vending Machines"
  },
  {
    "CriterionID": 10294,
    "Category": "/Business & Industrial/Scientific Equipment & Services"
  },
  {
    "CriterionID": 11047,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Bioremediation"
  },
  {
    "CriterionID": 11252,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Biotechnology Equipment"
  },
  {
    "CriterionID": 11254,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies"
  },
  {
    "CriterionID": 12560,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies/Lab Safety Equipment"
  },
  {
    "CriterionID": 12561,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies/Laboratory Incubators"
  },
  {
    "CriterionID": 12567,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies/Microscopes & Microscope Accessories"
  },
  {
    "CriterionID": 12565,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies/Mobile Labs"
  },
  {
    "CriterionID": 12564,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Laboratory Equipment & Supplies/Scientific Centrifuges"
  },
  {
    "CriterionID": 11054,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Materials Testing"
  },
  {
    "CriterionID": 11253,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Scientific Books & Journals"
  },
  {
    "CriterionID": 11255,
    "Category": "/Business & Industrial/Scientific Equipment & Services/Scientific Glassware & Accessories"
  },
  {
    "CriterionID": 10299,
    "Category": "/Business & Industrial/Security Equipment & Services"
  },
  {
    "CriterionID": 11062,
    "Category": "/Business & Industrial/Security Equipment & Services/Body Guards"
  },
  {
    "CriterionID": 11322,
    "Category": "/Business & Industrial/Security Equipment & Services/Car Alarm Systems"
  },
  {
    "CriterionID": 11311,
    "Category": "/Business & Industrial/Security Equipment & Services/Electronic Voice Changers"
  },
  {
    "CriterionID": 11316,
    "Category": "/Business & Industrial/Security Equipment & Services/Intercoms"
  },
  {
    "CriterionID": 11310,
    "Category": "/Business & Industrial/Security Equipment & Services/Night Vision Goggles & Scopes"
  },
  {
    "CriterionID": 11309,
    "Category": "/Business & Industrial/Security Equipment & Services/Safes"
  },
  {
    "CriterionID": 11066,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Alarm Services"
  },
  {
    "CriterionID": 11065,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Guards"
  },
  {
    "CriterionID": 11321,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Weapons"
  },
  {
    "CriterionID": 12626,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Weapons/Batons"
  },
  {
    "CriterionID": 12625,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Weapons/Handcuffs"
  },
  {
    "CriterionID": 12629,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Weapons/Mace & Pepper Spray"
  },
  {
    "CriterionID": 12627,
    "Category": "/Business & Industrial/Security Equipment & Services/Security Weapons/Stun Guns & Tasers"
  },
  {
    "CriterionID": 11313,
    "Category": "/Business & Industrial/Security Equipment & Services/Surveillance Equipment"
  },
  {
    "CriterionID": 12620,
    "Category": "/Business & Industrial/Security Equipment & Services/Surveillance Equipment/Alarm Systems & Equipment"
  },
  {
    "CriterionID": 12622,
    "Category": "/Business & Industrial/Security Equipment & Services/Surveillance Equipment/Motion Detectors"
  },
  {
    "CriterionID": 12619,
    "Category": "/Business & Industrial/Security Equipment & Services/Surveillance Equipment/Phone Recorders & Phone Tap Detectors"
  },
  {
    "CriterionID": 12621,
    "Category": "/Business & Industrial/Security Equipment & Services/Surveillance Equipment/Security Cameras"
  },
  {
    "CriterionID": 11320,
    "Category": "/Business & Industrial/Security Equipment & Services/Weather Alert Radios"
  },
  {
    "CriterionID": 10305,
    "Category": "/Business & Industrial/Shipping & Packing"
  },
  {
    "CriterionID": 11374,
    "Category": "/Business & Industrial/Shipping & Packing/Cargo Containers"
  },
  {
    "CriterionID": 13604,
    "Category": "/Business & Industrial/Shipping & Packing/Couriers & Messengers"
  },
  {
    "CriterionID": 11104,
    "Category": "/Business & Industrial/Shipping & Packing/Express & Expedited Shipping"
  },
  {
    "CriterionID": 11103,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting"
  },
  {
    "CriterionID": 12401,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Air Cargo"
  },
  {
    "CriterionID": 12403,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Containerization"
  },
  {
    "CriterionID": 12400,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Freight Forwarding"
  },
  {
    "CriterionID": 12402,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/LTL (Less Than Truckload) Shipping"
  },
  {
    "CriterionID": 12405,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Maritime Freighting"
  },
  {
    "CriterionID": 12404,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Rail Freighting"
  },
  {
    "CriterionID": 12406,
    "Category": "/Business & Industrial/Shipping & Packing/Freighting/Trucking"
  },
  {
    "CriterionID": 13724,
    "Category": "/Business & Industrial/Shipping & Packing/Mail & Package Delivery"
  },
  {
    "CriterionID": 11376,
    "Category": "/Business & Industrial/Shipping & Packing/Mailing Tubes"
  },
  {
    "CriterionID": 11381,
    "Category": "/Business & Industrial/Shipping & Packing/Packing Cushioning & Packing Paper"
  },
  {
    "CriterionID": 11382,
    "Category": "/Business & Industrial/Shipping & Packing/Shipping Boxes"
  },
  {
    "CriterionID": 11327,
    "Category": "/Business & Industrial/Shipping & Packing/Stamps & Envelopes"
  },
  {
    "CriterionID": 11377,
    "Category": "/Business & Industrial/Shipping & Packing/Strapping Equipment & Devices"
  },
  {
    "CriterionID": 11373,
    "Category": "/Business & Industrial/Shipping & Packing/Tape & Tape Dispensers"
  },
  {
    "CriterionID": 11102,
    "Category": "/Business & Industrial/Shipping & Packing/Warehousing"
  },
  {
    "CriterionID": 11235,
    "Category": "/Business & Industrial/Veterinary Equipment & Supplies"
  },
  {
    "CriterionID": 10019,
    "Category": "/Computers & Consumer Electronics"
  },
  {
    "CriterionID": 10168,
    "Category": "/Computers & Consumer Electronics/Computers"
  },
  {
    "CriterionID": 10886,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories"
  },
  {
    "CriterionID": 12214,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Adapters"
  },
  {
    "CriterionID": 12212,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Cables"
  },
  {
    "CriterionID": 12217,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Cases & Case Accessories"
  },
  {
    "CriterionID": 12222,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Keyboards"
  },
  {
    "CriterionID": 12219,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Monitor Accessories"
  },
  {
    "CriterionID": 12221,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Power Supplies"
  },
  {
    "CriterionID": 13400,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Computer Speakers"
  },
  {
    "CriterionID": 12218,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Fans & Cooling Equipment"
  },
  {
    "CriterionID": 12223,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Graphics Tablets"
  },
  {
    "CriterionID": 13815,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Laptop Batteries"
  },
  {
    "CriterionID": 12216,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Mice & Pointing Devices"
  },
  {
    "CriterionID": 12213,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Networking Accessories"
  },
  {
    "CriterionID": 12220,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/PDA Accessories"
  },
  {
    "CriterionID": 12215,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Scanner Accessories"
  },
  {
    "CriterionID": 12224,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Accessories/Webcams"
  },
  {
    "CriterionID": 12203,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Consulting"
  },
  {
    "CriterionID": 10883,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware"
  },
  {
    "CriterionID": 12188,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components"
  },
  {
    "CriterionID": 13071,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Computer Processors"
  },
  {
    "CriterionID": 13312,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Computer Processors/Microprocessors"
  },
  {
    "CriterionID": 13074,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Ethernet Cards"
  },
  {
    "CriterionID": 13073,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Graphic & Video Cards"
  },
  {
    "CriterionID": 13072,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Motherboards"
  },
  {
    "CriterionID": 13075,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Components/Sound Cards"
  },
  {
    "CriterionID": 12194,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices"
  },
  {
    "CriterionID": 13080,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/CD & DVD Storage Media"
  },
  {
    "CriterionID": 13081,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Desktop Memory Cards & Devices"
  },
  {
    "CriterionID": 13078,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/External Hard Drives"
  },
  {
    "CriterionID": 13082,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Flash Memory Devices & Memory Sticks"
  },
  {
    "CriterionID": 13077,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Internal Hard Drives"
  },
  {
    "CriterionID": 13084,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Laptop Memory Cards & Devices"
  },
  {
    "CriterionID": 13079,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Memory Card Readers"
  },
  {
    "CriterionID": 13083,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Memory & Storage Devices/Tape Back-Up Drives & Media"
  },
  {
    "CriterionID": 12185,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Monitors & Projectors"
  },
  {
    "CriterionID": 13067,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Monitors & Projectors/CRT Monitors"
  },
  {
    "CriterionID": 13065,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Monitors & Projectors/Electronic Projectors"
  },
  {
    "CriterionID": 13066,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Monitors & Projectors/LCD Monitors"
  },
  {
    "CriterionID": 12184,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices"
  },
  {
    "CriterionID": 13063,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Ethernet Networking Devices"
  },
  {
    "CriterionID": 13311,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Ethernet Networking Devices/Network Hubs & Adapters"
  },
  {
    "CriterionID": 13059,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Firewall & Spam Filter Hardware"
  },
  {
    "CriterionID": 13064,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Modems"
  },
  {
    "CriterionID": 13060,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Network Routers"
  },
  {
    "CriterionID": 13061,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Networking Devices/Network Switches"
  },
  {
    "CriterionID": 12189,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Server Components"
  },
  {
    "CriterionID": 13076,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Server Components/Computer Server Processors"
  },
  {
    "CriterionID": 12195,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Servers"
  },
  {
    "CriterionID": 13087,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Servers/Blade Servers"
  },
  {
    "CriterionID": 13085,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Servers/Desktop Servers"
  },
  {
    "CriterionID": 13086,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Servers/Rack-Mount Servers"
  },
  {
    "CriterionID": 12192,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Computer Workstations"
  },
  {
    "CriterionID": 12186,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/DVD & CD Drives, Burners & Recorders"
  },
  {
    "CriterionID": 12193,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Desktop Computers"
  },
  {
    "CriterionID": 13851,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Gaming Computers"
  },
  {
    "CriterionID": 12187,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Laptop Computers"
  },
  {
    "CriterionID": 13070,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Laptop Computers/Netbooks & Ultra-Mobile PCs"
  },
  {
    "CriterionID": 13068,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Laptop Computers/Tablet PCs"
  },
  {
    "CriterionID": 13069,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Laptop Computers/Ultra-Thin Laptops"
  },
  {
    "CriterionID": 12190,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Scanners"
  },
  {
    "CriterionID": 12191,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Hardware/Thin Clients"
  },
  {
    "CriterionID": 11057,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Manufacturing"
  },
  {
    "CriterionID": 12196,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Rentals"
  },
  {
    "CriterionID": 12201,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Repair"
  },
  {
    "CriterionID": 13090,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Repair/Data Recovery"
  },
  {
    "CriterionID": 13091,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Repair/Motherboard Repair"
  },
  {
    "CriterionID": 12202,
    "Category": "/Computers & Consumer Electronics/Computers/Computer Tech Support"
  },
  {
    "CriterionID": 12156,
    "Category": "/Computers & Consumer Electronics/Computers/Hosted Data Storage"
  },
  {
    "CriterionID": 10885,
    "Category": "/Computers & Consumer Electronics/Computers/Software"
  },
  {
    "CriterionID": 12209,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software"
  },
  {
    "CriterionID": 10537,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Accounting & Financial Software"
  },
  {
    "CriterionID": 13744,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Accounting & Financial Software/Time Management & Time Tracking Software"
  },
  {
    "CriterionID": 11289,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Building & Construction Software"
  },
  {
    "CriterionID": 10296,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software"
  },
  {
    "CriterionID": 11274,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Business Intelligence Software"
  },
  {
    "CriterionID": 11272,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Content & Knowledge Management Software"
  },
  {
    "CriterionID": 11265,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Customer Service & Support Software"
  },
  {
    "CriterionID": 11271,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Data Management Software"
  },
  {
    "CriterionID": 11266,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Facilities Management Software"
  },
  {
    "CriterionID": 11269,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Human Resources Software"
  },
  {
    "CriterionID": 11264,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Process Management Software"
  },
  {
    "CriterionID": 11268,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Procurement & Purchasing Software"
  },
  {
    "CriterionID": 11270,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Project Management Software"
  },
  {
    "CriterionID": 12579,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Project Management Software/Collaboration Software"
  },
  {
    "CriterionID": 12578,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Project Management Software/Enterprise Resource Planning Software"
  },
  {
    "CriterionID": 12581,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Project Management Software/Inventory & Asset Management Software"
  },
  {
    "CriterionID": 11273,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Sales & Marketing Software"
  },
  {
    "CriterionID": 11267,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Business Management Software/Supply Chain Management Software"
  },
  {
    "CriterionID": 12554,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Chemical Software"
  },
  {
    "CriterionID": 11221,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/E-Commerce & Retail Software"
  },
  {
    "CriterionID": 11258,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Energy & Utility Software"
  },
  {
    "CriterionID": 10155,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Legal Software"
  },
  {
    "CriterionID": 13107,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Medical Software"
  },
  {
    "CriterionID": 13108,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Real Estate Software & Tools"
  },
  {
    "CriterionID": 11251,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Scientific Software"
  },
  {
    "CriterionID": 13817,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Translation Software"
  },
  {
    "CriterionID": 13106,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Business & Productivity Software/Virtual Tour Software"
  },
  {
    "CriterionID": 13789,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Computer Monitoring & Spy Software"
  },
  {
    "CriterionID": 12207,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Device Drivers"
  },
  {
    "CriterionID": 13103,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Device Drivers/CD-ROM Drivers"
  },
  {
    "CriterionID": 13102,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Device Drivers/DVD-ROM Drivers"
  },
  {
    "CriterionID": 13101,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Device Drivers/Printer Drivers"
  },
  {
    "CriterionID": 13602,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Drafting & Design Software"
  },
  {
    "CriterionID": 12206,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Educational Software"
  },
  {
    "CriterionID": 13816,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Freeware & Shareware"
  },
  {
    "CriterionID": 11368,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software"
  },
  {
    "CriterionID": 12703,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Audio & Music Software"
  },
  {
    "CriterionID": 12700,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Desktop Publishing Software"
  },
  {
    "CriterionID": 13440,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Digital Media Players"
  },
  {
    "CriterionID": 12704,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Font Design Software"
  },
  {
    "CriterionID": 12701,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Photo Software"
  },
  {
    "CriterionID": 12705,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Video Software"
  },
  {
    "CriterionID": 12702,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Graphics & Multimedia Software/Web Design Software"
  },
  {
    "CriterionID": 12204,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies"
  },
  {
    "CriterionID": 13597,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Clip Art & Animated GIFs"
  },
  {
    "CriterionID": 13095,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Network Management Software"
  },
  {
    "CriterionID": 13092,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Network Security Software"
  },
  {
    "CriterionID": 13313,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Network Security Software/Anti-Spam Software"
  },
  {
    "CriterionID": 13314,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Network Security Software/Anti-Virus Software"
  },
  {
    "CriterionID": 13372,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Screensavers & Digital Wallpaper"
  },
  {
    "CriterionID": 13096,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Site Management Software"
  },
  {
    "CriterionID": 13371,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Social Network Apps & Add-ons"
  },
  {
    "CriterionID": 13713,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Toolbars"
  },
  {
    "CriterionID": 13097,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Web Applications"
  },
  {
    "CriterionID": 13406,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Web Browsers"
  },
  {
    "CriterionID": 11497,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Web Stats & Internet Analytics"
  },
  {
    "CriterionID": 13404,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Internet Software & Web Goodies/Web Templates"
  },
  {
    "CriterionID": 13112,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Mac Software"
  },
  {
    "CriterionID": 12205,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Middleware"
  },
  {
    "CriterionID": 13099,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Middleware/Application Server Software"
  },
  {
    "CriterionID": 13100,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Middleware/Database Software"
  },
  {
    "CriterionID": 13098,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Middleware/Service Oriented Architecture"
  },
  {
    "CriterionID": 12208,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Operating Systems & OS Emulators"
  },
  {
    "CriterionID": 13104,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Operating Systems & OS Emulators/Operating Systems"
  },
  {
    "CriterionID": 13105,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Operating Systems & OS Emulators/Virtualization Software"
  },
  {
    "CriterionID": 13413,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Remote Desktop & VPN Software"
  },
  {
    "CriterionID": 12197,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development"
  },
  {
    "CriterionID": 12211,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Programming & Developer Software"
  },
  {
    "CriterionID": 13113,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Programming & Developer Software/C & C++ Software"
  },
  {
    "CriterionID": 13110,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Programming & Developer Software/Debugging Software"
  },
  {
    "CriterionID": 13111,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Programming & Developer Software/Java Software"
  },
  {
    "CriterionID": 13642,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Software & Application Frameworks"
  },
  {
    "CriterionID": 13643,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Software Testing"
  },
  {
    "CriterionID": 13750,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Development/Version Control Software"
  },
  {
    "CriterionID": 12210,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Software Utilities"
  },
  {
    "CriterionID": 13114,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Unix Software"
  },
  {
    "CriterionID": 13109,
    "Category": "/Computers & Consumer Electronics/Computers/Software/Windows & .NET Software"
  },
  {
    "CriterionID": 10882,
    "Category": "/Computers & Consumer Electronics/Computers/Technology News & Publications"
  },
  {
    "CriterionID": 12199,
    "Category": "/Computers & Consumer Electronics/Computers/Technology Specs, Reviews & Comparisons"
  },
  {
    "CriterionID": 10167,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics"
  },
  {
    "CriterionID": 10881,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video"
  },
  {
    "CriterionID": 11314,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/CB Radios"
  },
  {
    "CriterionID": 12130,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Audio Accessories"
  },
  {
    "CriterionID": 12178,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Audio Amplifiers"
  },
  {
    "CriterionID": 12183,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Audio Equalizers"
  },
  {
    "CriterionID": 12181,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car CD Players & Changers"
  },
  {
    "CriterionID": 12172,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car DVD Players"
  },
  {
    "CriterionID": 12179,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Speakers"
  },
  {
    "CriterionID": 12182,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Stereos"
  },
  {
    "CriterionID": 12175,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Video Accessories"
  },
  {
    "CriterionID": 12173,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/Car Video Screens"
  },
  {
    "CriterionID": 12174,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Car Audio & Video/In-Dash Video Units"
  },
  {
    "CriterionID": 10872,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Accessories"
  },
  {
    "CriterionID": 13402,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Accessories/Batteries & Chargers"
  },
  {
    "CriterionID": 13401,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Accessories/Batteries & Chargers/Multi-Purpose Batteries & Chargers"
  },
  {
    "CriterionID": 12149,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Donation"
  },
  {
    "CriterionID": 12150,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Service & Repair"
  },
  {
    "CriterionID": 12148,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Consumer Electronic Warranty Plans"
  },
  {
    "CriterionID": 12153,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Electronic Waste Disposal"
  },
  {
    "CriterionID": 10880,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation"
  },
  {
    "CriterionID": 12131,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Accessories"
  },
  {
    "CriterionID": 12177,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Devices"
  },
  {
    "CriterionID": 11893,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Devices/Handheld GPS Devices"
  },
  {
    "CriterionID": 13056,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Devices/Vehicle GPS Devices"
  },
  {
    "CriterionID": 13309,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Devices/Vehicle GPS Devices/Automotive GPS Systems"
  },
  {
    "CriterionID": 13310,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/GPS & Navigation/GPS Devices/Vehicle GPS Devices/Marine GPS Systems"
  },
  {
    "CriterionID": 10873,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video"
  },
  {
    "CriterionID": 13047,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Blu-Ray Players & Recorders"
  },
  {
    "CriterionID": 12146,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/DVD Players"
  },
  {
    "CriterionID": 12145,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/DVRs & Set Top Boxes"
  },
  {
    "CriterionID": 12136,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/HD Players & Recorders"
  },
  {
    "CriterionID": 13776,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Headphones"
  },
  {
    "CriterionID": 12132,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Home Audio & Video Accessories"
  },
  {
    "CriterionID": 13030,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Home Audio & Video Accessories/Television Accessories"
  },
  {
    "CriterionID": 13307,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Home Audio & Video Accessories/Television Accessories/Television Receivers"
  },
  {
    "CriterionID": 12140,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Home Theater Projectors"
  },
  {
    "CriterionID": 12137,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Home Theater Systems"
  },
  {
    "CriterionID": 12134,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components"
  },
  {
    "CriterionID": 13034,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/CD-Players & Changers"
  },
  {
    "CriterionID": 13036,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/Home Audio Amplifiers"
  },
  {
    "CriterionID": 13037,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/Home Audio Equalizers"
  },
  {
    "CriterionID": 13033,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/Home Audio Receivers"
  },
  {
    "CriterionID": 13038,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/Record Players"
  },
  {
    "CriterionID": 13035,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Music Systems & Music Components/Tape Players"
  },
  {
    "CriterionID": 12144,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Radios & Radio Equipment"
  },
  {
    "CriterionID": 13044,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Radios & Radio Equipment/AM-FM Radios"
  },
  {
    "CriterionID": 13045,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Radios & Radio Equipment/DAB Radios"
  },
  {
    "CriterionID": 13046,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Radios & Radio Equipment/Satellite Radio Receivers & Players"
  },
  {
    "CriterionID": 12138,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Speakers"
  },
  {
    "CriterionID": 12143,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Televisions"
  },
  {
    "CriterionID": 13042,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Televisions/HDTVs"
  },
  {
    "CriterionID": 13041,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Televisions/LCD TVs"
  },
  {
    "CriterionID": 13043,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/Televisions/Plasma TVs"
  },
  {
    "CriterionID": 12142,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Home Audio & Video/VCRs"
  },
  {
    "CriterionID": 10877,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices"
  },
  {
    "CriterionID": 13495,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/Digital Book Readers"
  },
  {
    "CriterionID": 12165,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/MP3 Player Accessories"
  },
  {
    "CriterionID": 12164,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/MP3 Players"
  },
  {
    "CriterionID": 12167,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/Portable CD Players"
  },
  {
    "CriterionID": 12163,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/Portable DVD Players"
  },
  {
    "CriterionID": 12166,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Portable Media Devices/Portable Stereos & Boomboxes"
  },
  {
    "CriterionID": 11318,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Radar Detectors"
  },
  {
    "CriterionID": 10876,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Wireless Devices"
  },
  {
    "CriterionID": 12160,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Wireless Devices/Bluetooth Wireless Accessories & Devices"
  },
  {
    "CriterionID": 12159,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Wireless Devices/PDAs"
  },
  {
    "CriterionID": 12162,
    "Category": "/Computers & Consumer Electronics/Consumer Electronics/Wireless Devices/Walkie-Talkies"
  },
  {
    "CriterionID": 10020,
    "Category": "/Dining & Nightlife"
  },
  {
    "CriterionID": 11870,
    "Category": "/Dining & Nightlife/Dining & Nightlife Reviews, Guides & Listings"
  },
  {
    "CriterionID": 12974,
    "Category": "/Dining & Nightlife/Dining & Nightlife Reviews, Guides & Listings/Bar, Club & Nightlife Reviews, Guides & Listings"
  },
  {
    "CriterionID": 12975,
    "Category": "/Dining & Nightlife/Dining & Nightlife Reviews, Guides & Listings/Restaurant Reviews, Guides & Listings"
  },
  {
    "CriterionID": 13439,
    "Category": "/Dining & Nightlife/Nightclubs, Bars & Music Clubs"
  },
  {
    "CriterionID": 10169,
    "Category": "/Dining & Nightlife/Restaurants"
  },
  {
    "CriterionID": 13693,
    "Category": "/Dining & Nightlife/Restaurants/Bakeries"
  },
  {
    "CriterionID": 10890,
    "Category": "/Dining & Nightlife/Restaurants/Dine-In Restaurants"
  },
  {
    "CriterionID": 10891,
    "Category": "/Dining & Nightlife/Restaurants/Fast Food Restaurants"
  },
  {
    "CriterionID": 12228,
    "Category": "/Dining & Nightlife/Restaurants/Pizzerias & Pizza Delivery"
  },
  {
    "CriterionID": 10888,
    "Category": "/Dining & Nightlife/Restaurants/Restaurant Reservations & Booking"
  },
  {
    "CriterionID": 10887,
    "Category": "/Dining & Nightlife/Restaurants/Restaurant Take-out & Delivery"
  },
  {
    "CriterionID": 10002,
    "Category": "/Family & Community"
  },
  {
    "CriterionID": 10030,
    "Category": "/Family & Community/Baby, Parenting & Family"
  },
  {
    "CriterionID": 10235,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby"
  },
  {
    "CriterionID": 10052,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene"
  },
  {
    "CriterionID": 11020,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training"
  },
  {
    "CriterionID": 12296,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training/Baby Wipes"
  },
  {
    "CriterionID": 12298,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training/Diaper Pails & Disposal Accessories"
  },
  {
    "CriterionID": 12295,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training/Diaper Rash"
  },
  {
    "CriterionID": 12294,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training/Diapers"
  },
  {
    "CriterionID": 12299,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Diapering & Toilet Training/Potties"
  },
  {
    "CriterionID": 13134,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Care & Hygiene/Baby Shampoo & Lotion"
  },
  {
    "CriterionID": 11022,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding"
  },
  {
    "CriterionID": 12312,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Baby Bottles"
  },
  {
    "CriterionID": 12307,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Baby Feeding Pillows"
  },
  {
    "CriterionID": 12317,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Baby Food"
  },
  {
    "CriterionID": 12314,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Baby Formula"
  },
  {
    "CriterionID": 12335,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Breastfeeding"
  },
  {
    "CriterionID": 12304,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Breastfeeding/Breastfeeding Equipment & Supplies"
  },
  {
    "CriterionID": 12309,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Burp Cloths & Baby Bibs"
  },
  {
    "CriterionID": 12308,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Highchairs & Booster Seats"
  },
  {
    "CriterionID": 12303,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Feeding/Pacifiers"
  },
  {
    "CriterionID": 11018,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear"
  },
  {
    "CriterionID": 12283,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Baby Carriers"
  },
  {
    "CriterionID": 12285,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Baby Swings, Baby Bouncers & Gliders"
  },
  {
    "CriterionID": 12281,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Baby Walkers"
  },
  {
    "CriterionID": 12282,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Diaper Bags"
  },
  {
    "CriterionID": 12287,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Play Pens"
  },
  {
    "CriterionID": 12286,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Play Tents"
  },
  {
    "CriterionID": 12284,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Gear/Play Yards & Accessories"
  },
  {
    "CriterionID": 13712,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Names"
  },
  {
    "CriterionID": 11023,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety"
  },
  {
    "CriterionID": 12326,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Baby Car Safety"
  },
  {
    "CriterionID": 13133,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Baby Car Safety/Car Seats & Safety Boosters"
  },
  {
    "CriterionID": 12321,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Baby Monitors"
  },
  {
    "CriterionID": 12323,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Safety Gates"
  },
  {
    "CriterionID": 12325,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Shopping Cart Covers"
  },
  {
    "CriterionID": 12322,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Baby Safety/Toddler Safety Harnesses"
  },
  {
    "CriterionID": 11025,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor"
  },
  {
    "CriterionID": 12329,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Baby Bedding"
  },
  {
    "CriterionID": 13143,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Baby Bedding/Baby Blankets"
  },
  {
    "CriterionID": 13336,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Baby Co-Sleepers"
  },
  {
    "CriterionID": 13255,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Baby Dressers"
  },
  {
    "CriterionID": 13259,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Changing Tables"
  },
  {
    "CriterionID": 13337,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Cradles & Bassinets"
  },
  {
    "CriterionID": 13338,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Crib Mattresses"
  },
  {
    "CriterionID": 13335,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Cribs"
  },
  {
    "CriterionID": 13334,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Moses Baskets"
  },
  {
    "CriterionID": 13137,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Nursery Lamps"
  },
  {
    "CriterionID": 13136,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Nursery Mobiles"
  },
  {
    "CriterionID": 13333,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Nursery Furniture & Decor/Toddler Beds & Bedding"
  },
  {
    "CriterionID": 11021,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Strollers & Stroller Accessories"
  },
  {
    "CriterionID": 12302,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Strollers & Stroller Accessories/Bike Trailer Strollers"
  },
  {
    "CriterionID": 12301,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Strollers & Stroller Accessories/Jogging Strollers"
  },
  {
    "CriterionID": 12300,
    "Category": "/Family & Community/Baby, Parenting & Family/Baby/Strollers & Stroller Accessories/Prams & Baby Carriages"
  },
  {
    "CriterionID": 10236,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family"
  },
  {
    "CriterionID": 11032,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Adoption"
  },
  {
    "CriterionID": 11031,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Child Care"
  },
  {
    "CriterionID": 12340,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Child Care/Au Pair & Nannies"
  },
  {
    "CriterionID": 12339,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Child Care/Baby Sitting"
  },
  {
    "CriterionID": 12341,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Child Care/Day Care"
  },
  {
    "CriterionID": 12338,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Child Care/Special Needs Care"
  },
  {
    "CriterionID": 11030,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Kids' Camps & Youth Programs"
  },
  {
    "CriterionID": 11028,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Maternity & New Parent"
  },
  {
    "CriterionID": 12334,
    "Category": "/Family & Community/Baby, Parenting & Family/Parenting & Family/Maternity & New Parent/Fetal Development"
  },
  {
    "CriterionID": 10028,
    "Category": "/Family & Community/Community Service & Social Organizations"
  },
  {
    "CriterionID": 10223,
    "Category": "/Family & Community/Community Service & Social Organizations/AIDS & HIV Support"
  },
  {
    "CriterionID": 10224,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse"
  },
  {
    "CriterionID": 11003,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Alcohol & Health"
  },
  {
    "CriterionID": 12277,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Alcohol & Health/Alcoholism & Treatment"
  },
  {
    "CriterionID": 12279,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Alcohol & Health/Blood Alcohol Monitors & Breathalyzers"
  },
  {
    "CriterionID": 12278,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Alcohol & Health/Underage Drinking & Underage Alcohol Abuse"
  },
  {
    "CriterionID": 11002,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Drug & Alcohol Rehab Programs"
  },
  {
    "CriterionID": 11001,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Drug Abuse & Treatment"
  },
  {
    "CriterionID": 12276,
    "Category": "/Family & Community/Community Service & Social Organizations/Alcohol & Substance Abuse/Drug Abuse & Treatment/Home Drug Tests"
  },
  {
    "CriterionID": 10229,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach"
  },
  {
    "CriterionID": 11012,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Child Welfare Services"
  },
  {
    "CriterionID": 13737,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Crime Prevention"
  },
  {
    "CriterionID": 11010,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Domestic Violence"
  },
  {
    "CriterionID": 11013,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Food Outreach & Food Banks"
  },
  {
    "CriterionID": 11011,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Homeless Outreach Programs"
  },
  {
    "CriterionID": 11014,
    "Category": "/Family & Community/Community Service & Social Organizations/Community Outreach/Literacy"
  },
  {
    "CriterionID": 10222,
    "Category": "/Family & Community/Community Service & Social Organizations/Consumer Resources"
  },
  {
    "CriterionID": 11087,
    "Category": "/Family & Community/Community Service & Social Organizations/Consumer Resources/Consumer Advocacy & Protection"
  },
  {
    "CriterionID": 13813,
    "Category": "/Family & Community/Community Service & Social Organizations/Consumer Resources/Product Reviews & Price Comparisons"
  },
  {
    "CriterionID": 10220,
    "Category": "/Family & Community/Community Service & Social Organizations/Disability Resources"
  },
  {
    "CriterionID": 10219,
    "Category": "/Family & Community/Community Service & Social Organizations/Disaster Relief & Emergency Management"
  },
  {
    "CriterionID": 11077,
    "Category": "/Family & Community/Community Service & Social Organizations/Environmentalism"
  },
  {
    "CriterionID": 12358,
    "Category": "/Family & Community/Community Service & Social Organizations/Environmentalism/Environmental Research"
  },
  {
    "CriterionID": 10221,
    "Category": "/Family & Community/Community Service & Social Organizations/Ethnic Identity Resources"
  },
  {
    "CriterionID": 10226,
    "Category": "/Family & Community/Community Service & Social Organizations/GLBT Resources"
  },
  {
    "CriterionID": 13599,
    "Category": "/Family & Community/Community Service & Social Organizations/Multilateral & Non-Governmental Organizations"
  },
  {
    "CriterionID": 10230,
    "Category": "/Family & Community/Community Service & Social Organizations/Nonprofit Services"
  },
  {
    "CriterionID": 11015,
    "Category": "/Family & Community/Community Service & Social Organizations/Nonprofit Services/Donations & Charitable Giving"
  },
  {
    "CriterionID": 13393,
    "Category": "/Family & Community/Community Service & Social Organizations/Selective Service"
  },
  {
    "CriterionID": 11063,
    "Category": "/Family & Community/Community Service & Social Organizations/Self-Defense Training"
  },
  {
    "CriterionID": 13709,
    "Category": "/Family & Community/Community Service & Social Organizations/Senior Resources"
  },
  {
    "CriterionID": 13392,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Insurance Programs & Entitlements"
  },
  {
    "CriterionID": 13390,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Insurance Programs & Entitlements/Publicly Funded Health Programs"
  },
  {
    "CriterionID": 13389,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Insurance Programs & Entitlements/Welfare & Unemployment"
  },
  {
    "CriterionID": 10227,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy"
  },
  {
    "CriterionID": 11009,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Animal Rights Activism"
  },
  {
    "CriterionID": 12375,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Consumer Activism"
  },
  {
    "CriterionID": 11008,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Environmental Activism"
  },
  {
    "CriterionID": 12359,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Environmental Activism/Environmental Watchdogs"
  },
  {
    "CriterionID": 11007,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Human Rights Activism"
  },
  {
    "CriterionID": 11004,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Peace Activism"
  },
  {
    "CriterionID": 11006,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Reproductive Rights"
  },
  {
    "CriterionID": 11005,
    "Category": "/Family & Community/Community Service & Social Organizations/Social Issues & Advocacy/Work & Labor Issues"
  },
  {
    "CriterionID": 10225,
    "Category": "/Family & Community/Community Service & Social Organizations/Teen Advice & Support"
  },
  {
    "CriterionID": 10218,
    "Category": "/Family & Community/Community Service & Social Organizations/Volunteer Opportunities"
  },
  {
    "CriterionID": 10228,
    "Category": "/Family & Community/Community Service & Social Organizations/Youth Organizations & Resources"
  },
  {
    "CriterionID": 10029,
    "Category": "/Family & Community/Domestic & Personal Resources"
  },
  {
    "CriterionID": 10234,
    "Category": "/Family & Community/Domestic & Personal Resources/Personal Chefs"
  },
  {
    "CriterionID": 10233,
    "Category": "/Family & Community/Domestic & Personal Resources/Personal Errand & Concierge Services"
  },
  {
    "CriterionID": 10231,
    "Category": "/Family & Community/Faith & Belief"
  },
  {
    "CriterionID": 13469,
    "Category": "/Family & Community/Faith & Belief/Astrology & Horoscopes"
  },
  {
    "CriterionID": 13474,
    "Category": "/Family & Community/Faith & Belief/Buddhism"
  },
  {
    "CriterionID": 13472,
    "Category": "/Family & Community/Faith & Belief/Christianity"
  },
  {
    "CriterionID": 13475,
    "Category": "/Family & Community/Faith & Belief/Hinduism"
  },
  {
    "CriterionID": 13473,
    "Category": "/Family & Community/Faith & Belief/Islam"
  },
  {
    "CriterionID": 13476,
    "Category": "/Family & Community/Faith & Belief/Judaism"
  },
  {
    "CriterionID": 13836,
    "Category": "/Family & Community/Faith & Belief/Meditation"
  },
  {
    "CriterionID": 10127,
    "Category": "/Family & Community/Faith & Belief/Occult & Paranormal"
  },
  {
    "CriterionID": 13470,
    "Category": "/Family & Community/Faith & Belief/Occult & Paranormal/Psychics & Fortune Telling"
  },
  {
    "CriterionID": 13471,
    "Category": "/Family & Community/Faith & Belief/Occult & Paranormal/Spells, Potions & Curses"
  },
  {
    "CriterionID": 13481,
    "Category": "/Family & Community/Faith & Belief/Occult & Paranormal/Tarot"
  },
  {
    "CriterionID": 13434,
    "Category": "/Family & Community/Faith & Belief/Places of Worship & Worship Services"
  },
  {
    "CriterionID": 13807,
    "Category": "/Family & Community/Faith & Belief/Prayers"
  },
  {
    "CriterionID": 13435,
    "Category": "/Family & Community/Faith & Belief/Religious Instruction"
  },
  {
    "CriterionID": 13436,
    "Category": "/Family & Community/Faith & Belief/Religious Media & Publications"
  },
  {
    "CriterionID": 13479,
    "Category": "/Family & Community/Faith & Belief/Scientology"
  },
  {
    "CriterionID": 13703,
    "Category": "/Family & Community/Faith & Belief/Self-Help & Motivational"
  },
  {
    "CriterionID": 13477,
    "Category": "/Family & Community/Faith & Belief/Wicca & Esoteric Religions"
  },
  {
    "CriterionID": 10031,
    "Category": "/Family & Community/Romance & Relationships"
  },
  {
    "CriterionID": 10240,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching"
  },
  {
    "CriterionID": 10239,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching/Dating Directories & Sites"
  },
  {
    "CriterionID": 10241,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching/Dating Forums & Chat"
  },
  {
    "CriterionID": 11035,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching/GLBT Dating"
  },
  {
    "CriterionID": 11036,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching/International Dating"
  },
  {
    "CriterionID": 13715,
    "Category": "/Family & Community/Romance & Relationships/Dating & Marriage Matching/Personals"
  },
  {
    "CriterionID": 10238,
    "Category": "/Family & Community/Romance & Relationships/Divorce & Separation"
  },
  {
    "CriterionID": 11033,
    "Category": "/Family & Community/Romance & Relationships/Divorce & Separation/Online Divorce"
  },
  {
    "CriterionID": 10237,
    "Category": "/Family & Community/Romance & Relationships/Relationship Advice"
  },
  {
    "CriterionID": 10242,
    "Category": "/Family & Community/Romance & Relationships/Troubled Relationships"
  },
  {
    "CriterionID": 11037,
    "Category": "/Family & Community/Romance & Relationships/Troubled Relationships/Family Counseling"
  },
  {
    "CriterionID": 11038,
    "Category": "/Family & Community/Romance & Relationships/Troubled Relationships/Marriage & Couples Counseling"
  },
  {
    "CriterionID": 10012,
    "Category": "/Finance"
  },
  {
    "CriterionID": 10100,
    "Category": "/Finance/ATM Sales & Processing"
  },
  {
    "CriterionID": 11093,
    "Category": "/Finance/Accounting & Auditing"
  },
  {
    "CriterionID": 12388,
    "Category": "/Finance/Accounting & Auditing/Billing Services"
  },
  {
    "CriterionID": 12391,
    "Category": "/Finance/Accounting & Auditing/Bookkeeping"
  },
  {
    "CriterionID": 12393,
    "Category": "/Finance/Accounting & Auditing/Cash Flow Management"
  },
  {
    "CriterionID": 12392,
    "Category": "/Finance/Accounting & Auditing/Collection Services"
  },
  {
    "CriterionID": 12389,
    "Category": "/Finance/Accounting & Auditing/Sarbanes-Oxley Compliance Management"
  },
  {
    "CriterionID": 12387,
    "Category": "/Finance/Accounting & Auditing/Tax Preparation & Planning"
  },
  {
    "CriterionID": 10093,
    "Category": "/Finance/Banking"
  },
  {
    "CriterionID": 11817,
    "Category": "/Finance/Banking/Bank Accounts"
  },
  {
    "CriterionID": 12947,
    "Category": "/Finance/Banking/Bank Accounts/Current Accounts & Checking Accounts"
  },
  {
    "CriterionID": 12949,
    "Category": "/Finance/Banking/Bank Accounts/Savings Accounts"
  },
  {
    "CriterionID": 13277,
    "Category": "/Finance/Banking/Bank Accounts/Savings Accounts/College Savings Plans"
  },
  {
    "CriterionID": 13278,
    "Category": "/Finance/Banking/Bank Accounts/Savings Accounts/Money Market Accounts"
  },
  {
    "CriterionID": 11811,
    "Category": "/Finance/Banking/Bill Payment Services"
  },
  {
    "CriterionID": 11816,
    "Category": "/Finance/Banking/Debit & Check Cards"
  },
  {
    "CriterionID": 11818,
    "Category": "/Finance/Banking/Fixed Deposit Accounts & Certificates"
  },
  {
    "CriterionID": 11815,
    "Category": "/Finance/Banking/Mobile Banking"
  },
  {
    "CriterionID": 11812,
    "Category": "/Finance/Banking/Offshore Banking"
  },
  {
    "CriterionID": 11814,
    "Category": "/Finance/Banking/Online Banking"
  },
  {
    "CriterionID": 11813,
    "Category": "/Finance/Banking/Private Banking"
  },
  {
    "CriterionID": 12948,
    "Category": "/Finance/Banking/Student Banking"
  },
  {
    "CriterionID": 10096,
    "Category": "/Finance/Business Finance"
  },
  {
    "CriterionID": 13717,
    "Category": "/Finance/Business Finance/Investment Banking"
  },
  {
    "CriterionID": 13720,
    "Category": "/Finance/Business Finance/Mergers & Acquisitions"
  },
  {
    "CriterionID": 10098,
    "Category": "/Finance/Business News & Media"
  },
  {
    "CriterionID": 10097,
    "Category": "/Finance/Credit & Lending"
  },
  {
    "CriterionID": 11842,
    "Category": "/Finance/Credit & Lending/Credit Cards"
  },
  {
    "CriterionID": 12967,
    "Category": "/Finance/Credit & Lending/Credit Cards/Business Credit Cards"
  },
  {
    "CriterionID": 12963,
    "Category": "/Finance/Credit & Lending/Credit Cards/Low Interest & No Interest Credit Cards"
  },
  {
    "CriterionID": 12965,
    "Category": "/Finance/Credit & Lending/Credit Cards/Rewards Cards"
  },
  {
    "CriterionID": 13303,
    "Category": "/Finance/Credit & Lending/Credit Cards/Rewards Cards/Cashback Rewards Cards"
  },
  {
    "CriterionID": 13304,
    "Category": "/Finance/Credit & Lending/Credit Cards/Rewards Cards/Travel & Miles Rewards Cards"
  },
  {
    "CriterionID": 13416,
    "Category": "/Finance/Credit & Lending/Credit Cards/Student Credit Cards"
  },
  {
    "CriterionID": 11837,
    "Category": "/Finance/Credit & Lending/Credit Counseling"
  },
  {
    "CriterionID": 11838,
    "Category": "/Finance/Credit & Lending/Credit Reports & Reporting Services"
  },
  {
    "CriterionID": 11839,
    "Category": "/Finance/Credit & Lending/Debt Management & Consolidation"
  },
  {
    "CriterionID": 11836,
    "Category": "/Finance/Credit & Lending/Identity Theft & Credit Monitoring"
  },
  {
    "CriterionID": 11841,
    "Category": "/Finance/Credit & Lending/Loans"
  },
  {
    "CriterionID": 12957,
    "Category": "/Finance/Credit & Lending/Loans/Auto Financing"
  },
  {
    "CriterionID": 13284,
    "Category": "/Finance/Credit & Lending/Loans/Auto Financing/Auto Leasing"
  },
  {
    "CriterionID": 13285,
    "Category": "/Finance/Credit & Lending/Loans/Auto Financing/Auto Loans"
  },
  {
    "CriterionID": 12953,
    "Category": "/Finance/Credit & Lending/Loans/Bad Credit & No Credit Credit & Lending"
  },
  {
    "CriterionID": 12956,
    "Category": "/Finance/Credit & Lending/Loans/Commercial Lending"
  },
  {
    "CriterionID": 13283,
    "Category": "/Finance/Credit & Lending/Loans/Commercial Lending/Commercial Mortgages"
  },
  {
    "CriterionID": 13281,
    "Category": "/Finance/Credit & Lending/Loans/Commercial Lending/Farm Loans & Price Support"
  },
  {
    "CriterionID": 12960,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages"
  },
  {
    "CriterionID": 13294,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Adjustable Rate & Tracker Mortgages"
  },
  {
    "CriterionID": 13292,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Buy-To-Let Mortgages"
  },
  {
    "CriterionID": 13295,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/First Time Buyer Mortgages"
  },
  {
    "CriterionID": 13293,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Fixed Rate Mortgages"
  },
  {
    "CriterionID": 13291,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Government Mortgages"
  },
  {
    "CriterionID": 13296,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Home Equity Loans & Lines of Credit"
  },
  {
    "CriterionID": 13299,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Home Refinancing Loans"
  },
  {
    "CriterionID": 13289,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Interest Only Mortgages"
  },
  {
    "CriterionID": 13290,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Reverse Mortgages"
  },
  {
    "CriterionID": 13297,
    "Category": "/Finance/Credit & Lending/Loans/Home Loans & Mortgages/Subprime Mortgages"
  },
  {
    "CriterionID": 12961,
    "Category": "/Finance/Credit & Lending/Loans/Personal Lending & Borrowing"
  },
  {
    "CriterionID": 13300,
    "Category": "/Finance/Credit & Lending/Loans/Personal Lending & Borrowing/Payday & Emergency Loans"
  },
  {
    "CriterionID": 13301,
    "Category": "/Finance/Credit & Lending/Loans/Personal Lending & Borrowing/Personal Loans & Lines of Credit"
  },
  {
    "CriterionID": 13286,
    "Category": "/Finance/Credit & Lending/Loans/Personal Lending & Borrowing/Title Loans"
  },
  {
    "CriterionID": 12959,
    "Category": "/Finance/Credit & Lending/Loans/Purchase Financing"
  },
  {
    "CriterionID": 13288,
    "Category": "/Finance/Credit & Lending/Loans/Purchase Financing/Computer & Consumer Electronics Financing"
  },
  {
    "CriterionID": 13287,
    "Category": "/Finance/Credit & Lending/Loans/Purchase Financing/Home Appliance Financing"
  },
  {
    "CriterionID": 11840,
    "Category": "/Finance/Credit & Lending/Loans/Unsecured Credit & Lending"
  },
  {
    "CriterionID": 12955,
    "Category": "/Finance/Credit & Lending/Loans/Unsecured Credit & Lending/Unsecured Loans"
  },
  {
    "CriterionID": 10092,
    "Category": "/Finance/Financial Planning & Management"
  },
  {
    "CriterionID": 10525,
    "Category": "/Finance/Financial Planning & Management/Inheritance & Estate Planning"
  },
  {
    "CriterionID": 10524,
    "Category": "/Finance/Financial Planning & Management/Money Management"
  },
  {
    "CriterionID": 10527,
    "Category": "/Finance/Financial Planning & Management/Retirement & Pension Planning"
  },
  {
    "CriterionID": 10526,
    "Category": "/Finance/Financial Planning & Management/Wealth Management"
  },
  {
    "CriterionID": 10099,
    "Category": "/Finance/Grants, Scholarships & Financial Aid"
  },
  {
    "CriterionID": 13437,
    "Category": "/Finance/Grants, Scholarships & Financial Aid/Government Grants"
  },
  {
    "CriterionID": 10536,
    "Category": "/Finance/Grants, Scholarships & Financial Aid/Student Loans"
  },
  {
    "CriterionID": 10535,
    "Category": "/Finance/Grants, Scholarships & Financial Aid/Study Grants & Scholarships"
  },
  {
    "CriterionID": 10102,
    "Category": "/Finance/Insurance"
  },
  {
    "CriterionID": 10551,
    "Category": "/Finance/Insurance/Accident & Casualty Insurance"
  },
  {
    "CriterionID": 10538,
    "Category": "/Finance/Insurance/Annuities"
  },
  {
    "CriterionID": 10303,
    "Category": "/Finance/Insurance/Business & Commercial Insurance"
  },
  {
    "CriterionID": 11366,
    "Category": "/Finance/Insurance/Business & Commercial Insurance/Professional Liability & Malpractice Insurance"
  },
  {
    "CriterionID": 11365,
    "Category": "/Finance/Insurance/Business & Commercial Insurance/Worker's Compensation Insurance"
  },
  {
    "CriterionID": 10549,
    "Category": "/Finance/Insurance/Credit Insurance"
  },
  {
    "CriterionID": 10541,
    "Category": "/Finance/Insurance/Disability Insurance"
  },
  {
    "CriterionID": 10548,
    "Category": "/Finance/Insurance/Disaster Insurance"
  },
  {
    "CriterionID": 10544,
    "Category": "/Finance/Insurance/Health Insurance"
  },
  {
    "CriterionID": 11846,
    "Category": "/Finance/Insurance/Health Insurance/Dental Insurance"
  },
  {
    "CriterionID": 11843,
    "Category": "/Finance/Insurance/Health Insurance/Long-term Care Insurance"
  },
  {
    "CriterionID": 11844,
    "Category": "/Finance/Insurance/Health Insurance/Supplemental Health Insurance"
  },
  {
    "CriterionID": 11845,
    "Category": "/Finance/Insurance/Health Insurance/Vision Insurance"
  },
  {
    "CriterionID": 10540,
    "Category": "/Finance/Insurance/Home Warranties"
  },
  {
    "CriterionID": 10545,
    "Category": "/Finance/Insurance/Liability Insurance"
  },
  {
    "CriterionID": 11848,
    "Category": "/Finance/Insurance/Liability Insurance/Personal Liability Insurance"
  },
  {
    "CriterionID": 10539,
    "Category": "/Finance/Insurance/Life Insurance"
  },
  {
    "CriterionID": 10542,
    "Category": "/Finance/Insurance/Pet Insurance"
  },
  {
    "CriterionID": 10547,
    "Category": "/Finance/Insurance/Property Insurance"
  },
  {
    "CriterionID": 11849,
    "Category": "/Finance/Insurance/Property Insurance/Homeowners Insurance"
  },
  {
    "CriterionID": 12969,
    "Category": "/Finance/Insurance/Property Insurance/Homeowners Insurance/Building Insurance"
  },
  {
    "CriterionID": 12968,
    "Category": "/Finance/Insurance/Property Insurance/Homeowners Insurance/Contents Insurance"
  },
  {
    "CriterionID": 11850,
    "Category": "/Finance/Insurance/Property Insurance/Renters Insurance"
  },
  {
    "CriterionID": 12394,
    "Category": "/Finance/Insurance/Risk Management"
  },
  {
    "CriterionID": 10546,
    "Category": "/Finance/Insurance/Travel Insurance"
  },
  {
    "CriterionID": 10550,
    "Category": "/Finance/Insurance/Vehicle Insurance"
  },
  {
    "CriterionID": 11854,
    "Category": "/Finance/Insurance/Vehicle Insurance/Car Insurance"
  },
  {
    "CriterionID": 11855,
    "Category": "/Finance/Insurance/Vehicle Insurance/Commercial Vehicle Insurance"
  },
  {
    "CriterionID": 11858,
    "Category": "/Finance/Insurance/Vehicle Insurance/Motorcycle Insurance"
  },
  {
    "CriterionID": 11856,
    "Category": "/Finance/Insurance/Vehicle Insurance/Recreational Boat & Watercraft Insurance"
  },
  {
    "CriterionID": 11857,
    "Category": "/Finance/Insurance/Vehicle Insurance/Recreational Vehicle & Caravan Insurance"
  },
  {
    "CriterionID": 11853,
    "Category": "/Finance/Insurance/Vehicle Insurance/Van Insurance"
  },
  {
    "CriterionID": 10095,
    "Category": "/Finance/Investing"
  },
  {
    "CriterionID": 11819,
    "Category": "/Finance/Investing/Brokerages & Day Trading"
  },
  {
    "CriterionID": 11832,
    "Category": "/Finance/Investing/Commodities & Futures Trading"
  },
  {
    "CriterionID": 11831,
    "Category": "/Finance/Investing/Currencies & Foreign Exchange"
  },
  {
    "CriterionID": 11823,
    "Category": "/Finance/Investing/Derivatives"
  },
  {
    "CriterionID": 11826,
    "Category": "/Finance/Investing/Exchange Traded Funds"
  },
  {
    "CriterionID": 11835,
    "Category": "/Finance/Investing/Hedge Funds"
  },
  {
    "CriterionID": 11833,
    "Category": "/Finance/Investing/Interest Free & Tax-Deferred Savings Accounts"
  },
  {
    "CriterionID": 11820,
    "Category": "/Finance/Investing/Investor Relations & Venture Capital"
  },
  {
    "CriterionID": 11828,
    "Category": "/Finance/Investing/Mutual Funds"
  },
  {
    "CriterionID": 11834,
    "Category": "/Finance/Investing/Precious Metals Trading"
  },
  {
    "CriterionID": 10531,
    "Category": "/Finance/Investing/Real Estate Investments"
  },
  {
    "CriterionID": 11824,
    "Category": "/Finance/Investing/Retirement Investments"
  },
  {
    "CriterionID": 12950,
    "Category": "/Finance/Investing/Retirement Investments/401(K)s"
  },
  {
    "CriterionID": 12952,
    "Category": "/Finance/Investing/Retirement Investments/IRAs"
  },
  {
    "CriterionID": 12951,
    "Category": "/Finance/Investing/Retirement Investments/Pensions"
  },
  {
    "CriterionID": 11827,
    "Category": "/Finance/Investing/Securities"
  },
  {
    "CriterionID": 11830,
    "Category": "/Finance/Investing/Securities/Bonds"
  },
  {
    "CriterionID": 13459,
    "Category": "/Finance/Investing/Securities/Stocks"
  },
  {
    "CriterionID": 11825,
    "Category": "/Finance/Investing/Spread Betting"
  },
  {
    "CriterionID": 10094,
    "Category": "/Finance/Money Transfer & Wire Services"
  },
  {
    "CriterionID": 10010,
    "Category": "/Food & Groceries"
  },
  {
    "CriterionID": 10083,
    "Category": "/Food & Groceries/Beverages"
  },
  {
    "CriterionID": 10445,
    "Category": "/Food & Groceries/Beverages/Alcoholic Beverages"
  },
  {
    "CriterionID": 11651,
    "Category": "/Food & Groceries/Beverages/Alcoholic Beverages/Beer"
  },
  {
    "CriterionID": 11650,
    "Category": "/Food & Groceries/Beverages/Alcoholic Beverages/Liquor"
  },
  {
    "CriterionID": 11649,
    "Category": "/Food & Groceries/Beverages/Alcoholic Beverages/Wine"
  },
  {
    "CriterionID": 10444,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages"
  },
  {
    "CriterionID": 11646,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Alcohol Free Drink Mixers"
  },
  {
    "CriterionID": 13748,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Bottled Water & Water Delivery"
  },
  {
    "CriterionID": 11644,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Coffee"
  },
  {
    "CriterionID": 11647,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Energy Drinks"
  },
  {
    "CriterionID": 11643,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Juice"
  },
  {
    "CriterionID": 11642,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Soft Drinks"
  },
  {
    "CriterionID": 11648,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Sports Drinks"
  },
  {
    "CriterionID": 11645,
    "Category": "/Food & Groceries/Beverages/Non-Alcoholic Beverages/Tea"
  },
  {
    "CriterionID": 10082,
    "Category": "/Food & Groceries/Food"
  },
  {
    "CriterionID": 10432,
    "Category": "/Food & Groceries/Food/Baked Goods"
  },
  {
    "CriterionID": 11610,
    "Category": "/Food & Groceries/Food/Baked Goods/Brownies"
  },
  {
    "CriterionID": 11607,
    "Category": "/Food & Groceries/Food/Baked Goods/Cakes & Cupcakes"
  },
  {
    "CriterionID": 13247,
    "Category": "/Food & Groceries/Food/Baked Goods/Cakes & Cupcakes/Birthday Cakes"
  },
  {
    "CriterionID": 13837,
    "Category": "/Food & Groceries/Food/Baked Goods/Cakes & Cupcakes/Wedding Cakes"
  },
  {
    "CriterionID": 11609,
    "Category": "/Food & Groceries/Food/Baked Goods/Cookies"
  },
  {
    "CriterionID": 11608,
    "Category": "/Food & Groceries/Food/Baked Goods/Pies"
  },
  {
    "CriterionID": 12831,
    "Category": "/Food & Groceries/Food/Baked Goods/Pies/Savory Pies"
  },
  {
    "CriterionID": 12830,
    "Category": "/Food & Groceries/Food/Baked Goods/Pies/Sweet Pies"
  },
  {
    "CriterionID": 10434,
    "Category": "/Food & Groceries/Food/Baking Ingredients"
  },
  {
    "CriterionID": 11615,
    "Category": "/Food & Groceries/Food/Baking Ingredients/Baking Chocolate & Cocoa"
  },
  {
    "CriterionID": 11616,
    "Category": "/Food & Groceries/Food/Baking Ingredients/Baking Mixes"
  },
  {
    "CriterionID": 11614,
    "Category": "/Food & Groceries/Food/Baking Ingredients/Syrups & Sweeteners"
  },
  {
    "CriterionID": 12837,
    "Category": "/Food & Groceries/Food/Baking Ingredients/Syrups & Sweeteners/Sugar Substitutes"
  },
  {
    "CriterionID": 10439,
    "Category": "/Food & Groceries/Food/Breakfast Foods"
  },
  {
    "CriterionID": 11629,
    "Category": "/Food & Groceries/Food/Breakfast Foods/Breakfast Cereals"
  },
  {
    "CriterionID": 11628,
    "Category": "/Food & Groceries/Food/Breakfast Foods/Pancake, Waffle & Muffin Mixes"
  },
  {
    "CriterionID": 10438,
    "Category": "/Food & Groceries/Food/Candy, Gum & Mints"
  },
  {
    "CriterionID": 13846,
    "Category": "/Food & Groceries/Food/Candy, Gum & Mints/Chocolate"
  },
  {
    "CriterionID": 10430,
    "Category": "/Food & Groceries/Food/Condiments & Dressings"
  },
  {
    "CriterionID": 10433,
    "Category": "/Food & Groceries/Food/Cooking Oils & Spray"
  },
  {
    "CriterionID": 11612,
    "Category": "/Food & Groceries/Food/Cooking Oils & Spray/Olive Oil"
  },
  {
    "CriterionID": 11611,
    "Category": "/Food & Groceries/Food/Cooking Oils & Spray/Vegetable Oils"
  },
  {
    "CriterionID": 10440,
    "Category": "/Food & Groceries/Food/Dairy & Non-Dairy Alternatives"
  },
  {
    "CriterionID": 11632,
    "Category": "/Food & Groceries/Food/Dairy & Non-Dairy Alternatives/Cheese"
  },
  {
    "CriterionID": 11631,
    "Category": "/Food & Groceries/Food/Dairy & Non-Dairy Alternatives/Milk"
  },
  {
    "CriterionID": 11633,
    "Category": "/Food & Groceries/Food/Dairy & Non-Dairy Alternatives/Non-Dairy Alternatives"
  },
  {
    "CriterionID": 11630,
    "Category": "/Food & Groceries/Food/Dairy & Non-Dairy Alternatives/Yogurt"
  },
  {
    "CriterionID": 10436,
    "Category": "/Food & Groceries/Food/Desserts"
  },
  {
    "CriterionID": 11623,
    "Category": "/Food & Groceries/Food/Desserts/Frozen Desserts, Frozen Novelties & Accompaniments"
  },
  {
    "CriterionID": 10443,
    "Category": "/Food & Groceries/Food/Fish & Seafood"
  },
  {
    "CriterionID": 11639,
    "Category": "/Food & Groceries/Food/Fish & Seafood/Crab & Lobster"
  },
  {
    "CriterionID": 11641,
    "Category": "/Food & Groceries/Food/Fish & Seafood/Salmon"
  },
  {
    "CriterionID": 11640,
    "Category": "/Food & Groceries/Food/Fish & Seafood/Shrimp & Prawns"
  },
  {
    "CriterionID": 13758,
    "Category": "/Food & Groceries/Food/Gourmet & Specialty Foods"
  },
  {
    "CriterionID": 10426,
    "Category": "/Food & Groceries/Food/Grains, Pasta & Side Dishes"
  },
  {
    "CriterionID": 11600,
    "Category": "/Food & Groceries/Food/Grains, Pasta & Side Dishes/Pasta"
  },
  {
    "CriterionID": 11613,
    "Category": "/Food & Groceries/Food/Herbs & Spices"
  },
  {
    "CriterionID": 12835,
    "Category": "/Food & Groceries/Food/Herbs & Spices/Black Pepper"
  },
  {
    "CriterionID": 12833,
    "Category": "/Food & Groceries/Food/Herbs & Spices/Cinnamon"
  },
  {
    "CriterionID": 12834,
    "Category": "/Food & Groceries/Food/Herbs & Spices/Oregano"
  },
  {
    "CriterionID": 12832,
    "Category": "/Food & Groceries/Food/Herbs & Spices/Salt"
  },
  {
    "CriterionID": 10427,
    "Category": "/Food & Groceries/Food/Jams, Jellies & Preserves"
  },
  {
    "CriterionID": 10437,
    "Category": "/Food & Groceries/Food/Meat & Poultry"
  },
  {
    "CriterionID": 11624,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Beef"
  },
  {
    "CriterionID": 11625,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Deli & Lunch Meats"
  },
  {
    "CriterionID": 12839,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Deli & Lunch Meats/Cured Meats"
  },
  {
    "CriterionID": 12840,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Deli & Lunch Meats/Pre-Packaged Deli Meats"
  },
  {
    "CriterionID": 12838,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Deli & Lunch Meats/Sausages"
  },
  {
    "CriterionID": 11627,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Game & Exotic Meat"
  },
  {
    "CriterionID": 11626,
    "Category": "/Food & Groceries/Food/Meat & Poultry/Pork"
  },
  {
    "CriterionID": 13747,
    "Category": "/Food & Groceries/Food/Nut Butters"
  },
  {
    "CriterionID": 13695,
    "Category": "/Food & Groceries/Food/Organic & Natural Foods"
  },
  {
    "CriterionID": 10429,
    "Category": "/Food & Groceries/Food/Prepared Foods"
  },
  {
    "CriterionID": 11604,
    "Category": "/Food & Groceries/Food/Prepared Foods/Frozen Foods"
  },
  {
    "CriterionID": 11605,
    "Category": "/Food & Groceries/Food/Prepared Foods/Gourmet Prepared Foods"
  },
  {
    "CriterionID": 10441,
    "Category": "/Food & Groceries/Food/Produce"
  },
  {
    "CriterionID": 11634,
    "Category": "/Food & Groceries/Food/Produce/Fruit"
  },
  {
    "CriterionID": 11635,
    "Category": "/Food & Groceries/Food/Produce/Vegetables"
  },
  {
    "CriterionID": 10431,
    "Category": "/Food & Groceries/Food/Sauces"
  },
  {
    "CriterionID": 11606,
    "Category": "/Food & Groceries/Food/Sauces/BBQ & Grilling Sauces"
  },
  {
    "CriterionID": 10435,
    "Category": "/Food & Groceries/Food/Snack Foods"
  },
  {
    "CriterionID": 11617,
    "Category": "/Food & Groceries/Food/Snack Foods/Crackers"
  },
  {
    "CriterionID": 11620,
    "Category": "/Food & Groceries/Food/Snack Foods/Dried Fruit"
  },
  {
    "CriterionID": 11621,
    "Category": "/Food & Groceries/Food/Snack Foods/Nuts"
  },
  {
    "CriterionID": 11618,
    "Category": "/Food & Groceries/Food/Snack Foods/Popcorn"
  },
  {
    "CriterionID": 11622,
    "Category": "/Food & Groceries/Food/Snack Foods/Snack Chips"
  },
  {
    "CriterionID": 11619,
    "Category": "/Food & Groceries/Food/Snack Foods/Trail Mix"
  },
  {
    "CriterionID": 13843,
    "Category": "/Food & Groceries/Food/Soups, Stews & Beans"
  },
  {
    "CriterionID": 10442,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods"
  },
  {
    "CriterionID": 12847,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Diabetic Foods"
  },
  {
    "CriterionID": 12844,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Low Cholesterol Foods"
  },
  {
    "CriterionID": 12846,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Low-Sodium Foods"
  },
  {
    "CriterionID": 11637,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Religious Diet Foods"
  },
  {
    "CriterionID": 12848,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Religious Diet Foods/Kosher Foods & Resources"
  },
  {
    "CriterionID": 12845,
    "Category": "/Food & Groceries/Food/Special & Restricted Diet Foods/Wheat-free & Gluten-free Foods"
  },
  {
    "CriterionID": 10428,
    "Category": "/Food & Groceries/Food/Weight-Loss Foods & Nutrition Bars"
  },
  {
    "CriterionID": 11603,
    "Category": "/Food & Groceries/Food/Weight-Loss Foods & Nutrition Bars/Diet Bars"
  },
  {
    "CriterionID": 11602,
    "Category": "/Food & Groceries/Food/Weight-Loss Foods & Nutrition Bars/Meal Replacements"
  },
  {
    "CriterionID": 11601,
    "Category": "/Food & Groceries/Food/Weight-Loss Foods & Nutrition Bars/Nutrition Bars"
  },
  {
    "CriterionID": 10081,
    "Category": "/Food & Groceries/Household Supplies"
  },
  {
    "CriterionID": 10424,
    "Category": "/Food & Groceries/Household Supplies/Charcoal & Barbecuing Supplies"
  },
  {
    "CriterionID": 10422,
    "Category": "/Food & Groceries/Household Supplies/Food Wraps & Food Storage"
  },
  {
    "CriterionID": 11594,
    "Category": "/Food & Groceries/Household Supplies/Food Wraps & Food Storage/Food Savers & Food Storage Containers"
  },
  {
    "CriterionID": 11592,
    "Category": "/Food & Groceries/Household Supplies/Food Wraps & Food Storage/Food Storage Bags"
  },
  {
    "CriterionID": 13448,
    "Category": "/Food & Groceries/Household Supplies/Food Wraps & Food Storage/Lunch Boxes"
  },
  {
    "CriterionID": 11593,
    "Category": "/Food & Groceries/Household Supplies/Food Wraps & Food Storage/Plastic Wrap & Foil"
  },
  {
    "CriterionID": 10423,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products"
  },
  {
    "CriterionID": 11598,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Air Fresheners & Deodorizers"
  },
  {
    "CriterionID": 11596,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Cleaning Implements"
  },
  {
    "CriterionID": 11597,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Dish Detergents"
  },
  {
    "CriterionID": 11595,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Fabric Care"
  },
  {
    "CriterionID": 12829,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Fabric Care/Fabric Softeners & Dryer Sheets"
  },
  {
    "CriterionID": 12827,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Fabric Care/Fabric Stain Removers"
  },
  {
    "CriterionID": 12828,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Fabric Care/Laundry Detergents"
  },
  {
    "CriterionID": 12470,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Fabric Care/Lint Removers"
  },
  {
    "CriterionID": 13347,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Household Bleach"
  },
  {
    "CriterionID": 11599,
    "Category": "/Food & Groceries/Household Supplies/Household Cleaning Products/Household Cleansers"
  },
  {
    "CriterionID": 10421,
    "Category": "/Food & Groceries/Household Supplies/Paper Towels & Household Paper Products"
  },
  {
    "CriterionID": 11591,
    "Category": "/Food & Groceries/Household Supplies/Paper Towels & Household Paper Products/Facial Tissue"
  },
  {
    "CriterionID": 11590,
    "Category": "/Food & Groceries/Household Supplies/Paper Towels & Household Paper Products/Toilet Tissue"
  },
  {
    "CriterionID": 10425,
    "Category": "/Food & Groceries/Household Supplies/Trash Bags"
  },
  {
    "CriterionID": 10084,
    "Category": "/Food & Groceries/Online Grocery Shopping & Grocery Delivery"
  },
  {
    "CriterionID": 10011,
    "Category": "/Health"
  },
  {
    "CriterionID": 10088,
    "Category": "/Health/Biotech & Pharmaceutical"
  },
  {
    "CriterionID": 13369,
    "Category": "/Health/Biotech & Pharmaceutical/Gene Research"
  },
  {
    "CriterionID": 11791,
    "Category": "/Health/Biotech & Pharmaceutical/Gene Research/DNA & Genetic Testing"
  },
  {
    "CriterionID": 11049,
    "Category": "/Health/Biotech & Pharmaceutical/Gene Research/Gene Therapy"
  },
  {
    "CriterionID": 10500,
    "Category": "/Health/Biotech & Pharmaceutical/Gene Research/Genome Sequencing"
  },
  {
    "CriterionID": 10499,
    "Category": "/Health/Biotech & Pharmaceutical/Pharmaceutical Manufacturing"
  },
  {
    "CriterionID": 10501,
    "Category": "/Health/Biotech & Pharmaceutical/Protein Identification & Proteomics"
  },
  {
    "CriterionID": 11048,
    "Category": "/Health/Biotech & Pharmaceutical/Toxicology Services"
  },
  {
    "CriterionID": 10091,
    "Category": "/Health/Health Care Services"
  },
  {
    "CriterionID": 10510,
    "Category": "/Health/Health Care Services/Abortion Services"
  },
  {
    "CriterionID": 10507,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine"
  },
  {
    "CriterionID": 11779,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Acupuncture"
  },
  {
    "CriterionID": 11781,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Chinese Herbal Medicine"
  },
  {
    "CriterionID": 11780,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Chiropractors & Chiropractic"
  },
  {
    "CriterionID": 13722,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Cleansing & Detoxification"
  },
  {
    "CriterionID": 11668,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Cleansing & Detoxification/Colon Cleansing"
  },
  {
    "CriterionID": 11782,
    "Category": "/Health/Health Care Services/Alternative & Natural Medicine/Naturopathy"
  },
  {
    "CriterionID": 12106,
    "Category": "/Health/Health Care Services/Blood & Organ Donations & Transplants"
  },
  {
    "CriterionID": 10514,
    "Category": "/Health/Health Care Services/Dentists & Dental Services"
  },
  {
    "CriterionID": 11797,
    "Category": "/Health/Health Care Services/Dentists & Dental Services/Cosmetic Dentistry"
  },
  {
    "CriterionID": 11798,
    "Category": "/Health/Health Care Services/Dentists & Dental Services/Emergency Dental Services"
  },
  {
    "CriterionID": 11796,
    "Category": "/Health/Health Care Services/Dentists & Dental Services/General Dentistry"
  },
  {
    "CriterionID": 11795,
    "Category": "/Health/Health Care Services/Dentists & Dental Services/Orthodontists & Orthodontic Services"
  },
  {
    "CriterionID": 10513,
    "Category": "/Health/Health Care Services/General Health Care Services"
  },
  {
    "CriterionID": 10517,
    "Category": "/Health/Health Care Services/Geriatric & Aging Care Services"
  },
  {
    "CriterionID": 11804,
    "Category": "/Health/Health Care Services/Geriatric & Aging Care Services/Assisted Living Services"
  },
  {
    "CriterionID": 11805,
    "Category": "/Health/Health Care Services/Geriatric & Aging Care Services/In-Home Aging Care Services"
  },
  {
    "CriterionID": 11806,
    "Category": "/Health/Health Care Services/Geriatric & Aging Care Services/Retirement Homes & Senior Living Communities"
  },
  {
    "CriterionID": 10521,
    "Category": "/Health/Health Care Services/Hospice & Home Nursing Care"
  },
  {
    "CriterionID": 10520,
    "Category": "/Health/Health Care Services/Hospitals & Health Clinics"
  },
  {
    "CriterionID": 13576,
    "Category": "/Health/Health Care Services/Hospitals & Health Clinics/Hospitals"
  },
  {
    "CriterionID": 11809,
    "Category": "/Health/Health Care Services/Hospitals & Health Clinics/Urgent Care Clinic Services"
  },
  {
    "CriterionID": 11046,
    "Category": "/Health/Health Care Services/Immunology Services"
  },
  {
    "CriterionID": 10509,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services"
  },
  {
    "CriterionID": 11788,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/AIDS & HIV Testing Services"
  },
  {
    "CriterionID": 11786,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/Blood Testing Services"
  },
  {
    "CriterionID": 11785,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/Cancer Diagnosis & Screening"
  },
  {
    "CriterionID": 12944,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/Cancer Diagnosis & Screening/Breast Cancer Screening & Diagnosis"
  },
  {
    "CriterionID": 12943,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/Cancer Diagnosis & Screening/Prostate Cancer Screening & Diagnosis"
  },
  {
    "CriterionID": 11789,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/Hepatitis Testing & Diagnosis"
  },
  {
    "CriterionID": 11787,
    "Category": "/Health/Health Care Services/Laboratory Testing & Medical Diagnostic Services/STD Testing"
  },
  {
    "CriterionID": 10516,
    "Category": "/Health/Health Care Services/Medical Skin Care Services"
  },
  {
    "CriterionID": 11801,
    "Category": "/Health/Health Care Services/Medical Skin Care Services/Acne Treatment"
  },
  {
    "CriterionID": 11802,
    "Category": "/Health/Health Care Services/Medical Skin Care Services/Rosacea Treatment"
  },
  {
    "CriterionID": 10518,
    "Category": "/Health/Health Care Services/Mental Health Services"
  },
  {
    "CriterionID": 11808,
    "Category": "/Health/Health Care Services/Mental Health Services/Counseling Services"
  },
  {
    "CriterionID": 11807,
    "Category": "/Health/Health Care Services/Mental Health Services/Mental Health In-Patient Services"
  },
  {
    "CriterionID": 13822,
    "Category": "/Health/Health Care Services/Mental Health Services/Suicide Prevention"
  },
  {
    "CriterionID": 10519,
    "Category": "/Health/Health Care Services/Orthopedics & Sports Medicine"
  },
  {
    "CriterionID": 10511,
    "Category": "/Health/Health Care Services/Physical Rehabilitation"
  },
  {
    "CriterionID": 11794,
    "Category": "/Health/Health Care Services/Physical Rehabilitation/Occupational Therapy"
  },
  {
    "CriterionID": 11792,
    "Category": "/Health/Health Care Services/Physical Rehabilitation/Physical Therapy"
  },
  {
    "CriterionID": 10508,
    "Category": "/Health/Health Care Services/Plastic Surgery"
  },
  {
    "CriterionID": 11783,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery"
  },
  {
    "CriterionID": 12942,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Breast Enhancements"
  },
  {
    "CriterionID": 12937,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Brow Lifts"
  },
  {
    "CriterionID": 12940,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Eyelid Surgery"
  },
  {
    "CriterionID": 12938,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Face Lifts & Appearance Enhancement"
  },
  {
    "CriterionID": 12941,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Liposuction & Abdominoplasty"
  },
  {
    "CriterionID": 12936,
    "Category": "/Health/Health Care Services/Plastic Surgery/Cosmetic & Aesthetic Plastic Surgery/Rhinoplasty"
  },
  {
    "CriterionID": 11784,
    "Category": "/Health/Health Care Services/Plastic Surgery/Reconstructive Surgery"
  },
  {
    "CriterionID": 13452,
    "Category": "/Health/Health Care Services/Sex Reassignment Therapy"
  },
  {
    "CriterionID": 10515,
    "Category": "/Health/Health Care Services/Vision Services"
  },
  {
    "CriterionID": 11800,
    "Category": "/Health/Health Care Services/Vision Services/Eye Exams & Optometry"
  },
  {
    "CriterionID": 11799,
    "Category": "/Health/Health Care Services/Vision Services/Laser Vision Correction"
  },
  {
    "CriterionID": 11793,
    "Category": "/Health/Health Care Services/Wellness Therapy & Massage"
  },
  {
    "CriterionID": 12945,
    "Category": "/Health/Health Care Services/Wellness Therapy & Massage/Hydrotherapy Services"
  },
  {
    "CriterionID": 12946,
    "Category": "/Health/Health Care Services/Wellness Therapy & Massage/Massage & Relaxation Services"
  },
  {
    "CriterionID": 10512,
    "Category": "/Health/Health Care Services/Women's Health Care Services"
  },
  {
    "CriterionID": 10085,
    "Category": "/Health/Health Conditions & Concerns"
  },
  {
    "CriterionID": 10476,
    "Category": "/Health/Health Conditions & Concerns/AIDS & HIV"
  },
  {
    "CriterionID": 11725,
    "Category": "/Health/Health Conditions & Concerns/AIDS & HIV/AIDS & HIV Medications"
  },
  {
    "CriterionID": 11724,
    "Category": "/Health/Health Conditions & Concerns/AIDS & HIV/AIDS & HIV Testing"
  },
  {
    "CriterionID": 10446,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus"
  },
  {
    "CriterionID": 12849,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Air Cleaners & Filters"
  },
  {
    "CriterionID": 12850,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications"
  },
  {
    "CriterionID": 13265,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications/Corticosteroids"
  },
  {
    "CriterionID": 13266,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications/Injectable Epinephrine"
  },
  {
    "CriterionID": 13267,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications/Seasonal Allergy & Sinus Medication"
  },
  {
    "CriterionID": 13339,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications/Seasonal Allergy & Sinus Medication/Antihistamines"
  },
  {
    "CriterionID": 13340,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Allergy Medications/Seasonal Allergy & Sinus Medication/Decongestants"
  },
  {
    "CriterionID": 11653,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Food Allergies"
  },
  {
    "CriterionID": 12851,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Nasal Strips"
  },
  {
    "CriterionID": 11652,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Pet Allergies"
  },
  {
    "CriterionID": 11654,
    "Category": "/Health/Health Conditions & Concerns/Allergy & Sinus/Seasonal Allergies"
  },
  {
    "CriterionID": 10459,
    "Category": "/Health/Health Conditions & Concerns/Anemia"
  },
  {
    "CriterionID": 10479,
    "Category": "/Health/Health Conditions & Concerns/Arthritis"
  },
  {
    "CriterionID": 11735,
    "Category": "/Health/Health Conditions & Concerns/Arthritis/Arthritis Medications & Treatments"
  },
  {
    "CriterionID": 11733,
    "Category": "/Health/Health Conditions & Concerns/Arthritis/Osteoarthritis"
  },
  {
    "CriterionID": 12896,
    "Category": "/Health/Health Conditions & Concerns/Arthritis/Osteoarthritis/Osteoarthritis Medications"
  },
  {
    "CriterionID": 11734,
    "Category": "/Health/Health Conditions & Concerns/Arthritis/Rheumatoid Arthritis"
  },
  {
    "CriterionID": 12897,
    "Category": "/Health/Health Conditions & Concerns/Arthritis/Rheumatoid Arthritis/Rheumatoid Arthritis Medications"
  },
  {
    "CriterionID": 13358,
    "Category": "/Health/Health Conditions & Concerns/Bleeding Disorders"
  },
  {
    "CriterionID": 10483,
    "Category": "/Health/Health Conditions & Concerns/Blood Sugar & Diabetes"
  },
  {
    "CriterionID": 11741,
    "Category": "/Health/Health Conditions & Concerns/Blood Sugar & Diabetes/Diabetes Management"
  },
  {
    "CriterionID": 12900,
    "Category": "/Health/Health Conditions & Concerns/Blood Sugar & Diabetes/Diabetes Management/Glucose Meters & Test Strips"
  },
  {
    "CriterionID": 10464,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment"
  },
  {
    "CriterionID": 11692,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Breast Cancer"
  },
  {
    "CriterionID": 12879,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Breast Cancer/Breast Cancer Treatment"
  },
  {
    "CriterionID": 11688,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Awareness"
  },
  {
    "CriterionID": 11683,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Medications"
  },
  {
    "CriterionID": 12877,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Medications/Biological Therapies"
  },
  {
    "CriterionID": 12876,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Medications/Chemotherapy Medications"
  },
  {
    "CriterionID": 11689,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Research"
  },
  {
    "CriterionID": 11691,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Survival"
  },
  {
    "CriterionID": 11684,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cancer Treatment"
  },
  {
    "CriterionID": 11681,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Cervical Cancer"
  },
  {
    "CriterionID": 11694,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Chemotherapy Anemia"
  },
  {
    "CriterionID": 11682,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Colon & Colorectal Cancer"
  },
  {
    "CriterionID": 11685,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Leukemia"
  },
  {
    "CriterionID": 11690,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Lung Cancer"
  },
  {
    "CriterionID": 11680,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Lymphoma"
  },
  {
    "CriterionID": 11693,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Melanoma"
  },
  {
    "CriterionID": 11686,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Ovarian Cancer"
  },
  {
    "CriterionID": 11687,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Prostate Cancer"
  },
  {
    "CriterionID": 12878,
    "Category": "/Health/Health Conditions & Concerns/Cancer & Cancer Treatment/Prostate Cancer/Prostate Cancer Treatment"
  },
  {
    "CriterionID": 10452,
    "Category": "/Health/Health Conditions & Concerns/Cold Sores"
  },
  {
    "CriterionID": 11661,
    "Category": "/Health/Health Conditions & Concerns/Cold Sores/Cold Sore Medications"
  },
  {
    "CriterionID": 10451,
    "Category": "/Health/Health Conditions & Concerns/Cystic Fibrosis"
  },
  {
    "CriterionID": 10487,
    "Category": "/Health/Health Conditions & Concerns/Dental Health"
  },
  {
    "CriterionID": 11747,
    "Category": "/Health/Health Conditions & Concerns/Dental Health/Orthodontia & Orthodontic Braces"
  },
  {
    "CriterionID": 10456,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders"
  },
  {
    "CriterionID": 11666,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Dyspepsia"
  },
  {
    "CriterionID": 12861,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Dyspepsia/GERD & Heartburn"
  },
  {
    "CriterionID": 12858,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Dyspepsia/Heartburn, Indigestion & GERD Medications"
  },
  {
    "CriterionID": 12859,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Dyspepsia/Indigestion"
  },
  {
    "CriterionID": 11667,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Inflammatory Bowel Disease"
  },
  {
    "CriterionID": 12862,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Inflammatory Bowel Disease/Colitis"
  },
  {
    "CriterionID": 12863,
    "Category": "/Health/Health Conditions & Concerns/Digestive Health & Disorders/Inflammatory Bowel Disease/Crohn's Disease"
  },
  {
    "CriterionID": 10472,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat"
  },
  {
    "CriterionID": 10481,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Hearing Loss"
  },
  {
    "CriterionID": 11739,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Hearing Loss/Hearing Assistance Products"
  },
  {
    "CriterionID": 12899,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Hearing Loss/Hearing Assistance Products/Amplified Telephones & Accessories"
  },
  {
    "CriterionID": 12898,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Hearing Loss/Hearing Assistance Products/Hearing Aids & Accessories"
  },
  {
    "CriterionID": 11740,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Hearing Loss/Hearing Tests"
  },
  {
    "CriterionID": 13364,
    "Category": "/Health/Health Conditions & Concerns/Ear, Nose & Throat/Motion Sickness & Balance Disorders"
  },
  {
    "CriterionID": 10449,
    "Category": "/Health/Health Conditions & Concerns/Eating Disorders"
  },
  {
    "CriterionID": 11658,
    "Category": "/Health/Health Conditions & Concerns/Eating Disorders/Anorexia"
  },
  {
    "CriterionID": 11659,
    "Category": "/Health/Health Conditions & Concerns/Eating Disorders/Bulimia"
  },
  {
    "CriterionID": 10471,
    "Category": "/Health/Health Conditions & Concerns/Epilepsy"
  },
  {
    "CriterionID": 11709,
    "Category": "/Health/Health Conditions & Concerns/Epilepsy/Antiepileptic Medications"
  },
  {
    "CriterionID": 10485,
    "Category": "/Health/Health Conditions & Concerns/Foot Health"
  },
  {
    "CriterionID": 11743,
    "Category": "/Health/Health Conditions & Concerns/Foot Health/Arch Supports & Orthoses"
  },
  {
    "CriterionID": 11742,
    "Category": "/Health/Health Conditions & Concerns/Foot Health/Foot Anti-Fungal Remedies"
  },
  {
    "CriterionID": 13362,
    "Category": "/Health/Health Conditions & Concerns/Genetic Disorders"
  },
  {
    "CriterionID": 10465,
    "Category": "/Health/Health Conditions & Concerns/Geriatrics & Aging"
  },
  {
    "CriterionID": 11695,
    "Category": "/Health/Health Conditions & Concerns/Geriatrics & Aging/Alzheimer's Disease"
  },
  {
    "CriterionID": 12880,
    "Category": "/Health/Health Conditions & Concerns/Geriatrics & Aging/Alzheimer's Disease/Alzheimer Medications"
  },
  {
    "CriterionID": 11803,
    "Category": "/Health/Health Conditions & Concerns/Geriatrics & Aging/Alzheimer's Disease/Alzheimer's Care & Treatment"
  },
  {
    "CriterionID": 10486,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management"
  },
  {
    "CriterionID": 11744,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics"
  },
  {
    "CriterionID": 12905,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Acetaminophen"
  },
  {
    "CriterionID": 12935,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Headache & Migraine Medications"
  },
  {
    "CriterionID": 13273,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Headache & Migraine Medications/Headache Medications"
  },
  {
    "CriterionID": 13272,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Headache & Migraine Medications/Migraine Medications"
  },
  {
    "CriterionID": 12904,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Ibuprofen & Anti-Inflammatory Medications"
  },
  {
    "CriterionID": 12903,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Muscle Relaxants"
  },
  {
    "CriterionID": 12902,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Analgesics/Narcotic Analgesics"
  },
  {
    "CriterionID": 11745,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Fibromyalgia"
  },
  {
    "CriterionID": 11746,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Headaches & Migraines"
  },
  {
    "CriterionID": 12907,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Headaches & Migraines/Headaches"
  },
  {
    "CriterionID": 13271,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Headaches & Migraines/Headaches/Headache Medication"
  },
  {
    "CriterionID": 12906,
    "Category": "/Health/Health Conditions & Concerns/Headache & Pain Management/Headaches & Migraines/Migraines"
  },
  {
    "CriterionID": 10475,
    "Category": "/Health/Health Conditions & Concerns/Heart Health"
  },
  {
    "CriterionID": 11720,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/Coronary Artery Disease & Heart Attacks"
  },
  {
    "CriterionID": 11723,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/Heart Devices & Accessories"
  },
  {
    "CriterionID": 11719,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/High Blood Pressure"
  },
  {
    "CriterionID": 12893,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/High Blood Pressure/Blood Pressure Medications"
  },
  {
    "CriterionID": 11721,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/High Cholesterol"
  },
  {
    "CriterionID": 12894,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/High Cholesterol/Cholesterol Medications"
  },
  {
    "CriterionID": 11722,
    "Category": "/Health/Health Conditions & Concerns/Heart Health/Peripheral Artery Disease & Peripheral Vascular Disease (PAD & PVD)"
  },
  {
    "CriterionID": 10466,
    "Category": "/Health/Health Conditions & Concerns/Hemorrhoids"
  },
  {
    "CriterionID": 10467,
    "Category": "/Health/Health Conditions & Concerns/Hepatitis"
  },
  {
    "CriterionID": 11697,
    "Category": "/Health/Health Conditions & Concerns/Hepatitis/Hepatitis A"
  },
  {
    "CriterionID": 11696,
    "Category": "/Health/Health Conditions & Concerns/Hepatitis/Hepatitis B"
  },
  {
    "CriterionID": 11699,
    "Category": "/Health/Health Conditions & Concerns/Hepatitis/Hepatitis C"
  },
  {
    "CriterionID": 11698,
    "Category": "/Health/Health Conditions & Concerns/Hepatitis/Hepatitis Medications"
  },
  {
    "CriterionID": 10468,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses"
  },
  {
    "CriterionID": 10455,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu"
  },
  {
    "CriterionID": 11665,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Cold & Flu Medicines"
  },
  {
    "CriterionID": 12854,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Cold & Flu Medicines/Cold & Congestion Nasal Sprays & Gels"
  },
  {
    "CriterionID": 12857,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Cold & Flu Medicines/Cough & Cold Medicines"
  },
  {
    "CriterionID": 12856,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Cold & Flu Medicines/Flu Medications"
  },
  {
    "CriterionID": 12855,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Cold & Flu Medicines/Sore Throat Remedies"
  },
  {
    "CriterionID": 11663,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Colds"
  },
  {
    "CriterionID": 13879,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Influenza"
  },
  {
    "CriterionID": 12853,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Cold & Flu/Influenza/Flu Vaccines"
  },
  {
    "CriterionID": 11700,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Vaccines & Immunizations"
  },
  {
    "CriterionID": 10490,
    "Category": "/Health/Health Conditions & Concerns/Infectious Diseases & Viruses/Viral Infections"
  },
  {
    "CriterionID": 10461,
    "Category": "/Health/Health Conditions & Concerns/Injury & Wound Care"
  },
  {
    "CriterionID": 10478,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders"
  },
  {
    "CriterionID": 11731,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Hypersomnia"
  },
  {
    "CriterionID": 12895,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Hypersomnia/Excessive Daytime Sleepiness (EDS)"
  },
  {
    "CriterionID": 11729,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Insomnia"
  },
  {
    "CriterionID": 11728,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Narcolepsy"
  },
  {
    "CriterionID": 11730,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Sleep Medications"
  },
  {
    "CriterionID": 11732,
    "Category": "/Health/Health Conditions & Concerns/Insomnia & Sleep Disorders/Snore Relief"
  },
  {
    "CriterionID": 10469,
    "Category": "/Health/Health Conditions & Concerns/Learning & Developmental Disabilities"
  },
  {
    "CriterionID": 11702,
    "Category": "/Health/Health Conditions & Concerns/Learning & Developmental Disabilities/ADD & ADHD"
  },
  {
    "CriterionID": 12881,
    "Category": "/Health/Health Conditions & Concerns/Learning & Developmental Disabilities/ADD & ADHD/ADD & ADHD Medications"
  },
  {
    "CriterionID": 11701,
    "Category": "/Health/Health Conditions & Concerns/Learning & Developmental Disabilities/Autism"
  },
  {
    "CriterionID": 10482,
    "Category": "/Health/Health Conditions & Concerns/Lupus"
  },
  {
    "CriterionID": 10480,
    "Category": "/Health/Health Conditions & Concerns/Men's Health"
  },
  {
    "CriterionID": 11737,
    "Category": "/Health/Health Conditions & Concerns/Men's Health/Benign Prostatic Hyperplasia (BPH)"
  },
  {
    "CriterionID": 11736,
    "Category": "/Health/Health Conditions & Concerns/Men's Health/Erectile Dysfunction"
  },
  {
    "CriterionID": 11738,
    "Category": "/Health/Health Conditions & Concerns/Men's Health/Vasectomy"
  },
  {
    "CriterionID": 10488,
    "Category": "/Health/Health Conditions & Concerns/Mental Health"
  },
  {
    "CriterionID": 11748,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Anxiety & Stress"
  },
  {
    "CriterionID": 13819,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Anxiety & Stress/Obsessive-Compulsive Disorder"
  },
  {
    "CriterionID": 11749,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Bipolar Disorder"
  },
  {
    "CriterionID": 11751,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Depression"
  },
  {
    "CriterionID": 11750,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Mental Health Medications"
  },
  {
    "CriterionID": 12908,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Mental Health Medications/Anxiety-Relief Medications"
  },
  {
    "CriterionID": 12909,
    "Category": "/Health/Health Conditions & Concerns/Mental Health/Mental Health Medications/Depression Medications"
  },
  {
    "CriterionID": 10484,
    "Category": "/Health/Health Conditions & Concerns/Musculoskeletal Conditions"
  },
  {
    "CriterionID": 11707,
    "Category": "/Health/Health Conditions & Concerns/Musculoskeletal Conditions/Osteoporosis"
  },
  {
    "CriterionID": 10474,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions"
  },
  {
    "CriterionID": 10489,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Movement Disorders"
  },
  {
    "CriterionID": 11752,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Movement Disorders/Parkinson"
  },
  {
    "CriterionID": 11753,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Movement Disorders/Restless Leg Syndrome"
  },
  {
    "CriterionID": 13361,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Multiple Sclerosis"
  },
  {
    "CriterionID": 13360,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Stroke"
  },
  {
    "CriterionID": 11718,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Stroke/Stroke Medications"
  },
  {
    "CriterionID": 11717,
    "Category": "/Health/Health Conditions & Concerns/Neurological Conditions/Stroke/Stroke Rehab & Treatment"
  },
  {
    "CriterionID": 10450,
    "Category": "/Health/Health Conditions & Concerns/Obesity"
  },
  {
    "CriterionID": 11660,
    "Category": "/Health/Health Conditions & Concerns/Obesity/Obesity Surgery"
  },
  {
    "CriterionID": 11026,
    "Category": "/Health/Health Conditions & Concerns/Pediatrics & Children's Health"
  },
  {
    "CriterionID": 12332,
    "Category": "/Health/Health Conditions & Concerns/Pediatrics & Children's Health/Baby Health"
  },
  {
    "CriterionID": 13808,
    "Category": "/Health/Health Conditions & Concerns/Pediatrics & Children's Health/Baby Health/Teething"
  },
  {
    "CriterionID": 12330,
    "Category": "/Health/Health Conditions & Concerns/Pediatrics & Children's Health/Childhood Vaccines"
  },
  {
    "CriterionID": 12331,
    "Category": "/Health/Health Conditions & Concerns/Pediatrics & Children's Health/Children's Health Care"
  },
  {
    "CriterionID": 10448,
    "Category": "/Health/Health Conditions & Concerns/Respiratory Conditions"
  },
  {
    "CriterionID": 11656,
    "Category": "/Health/Health Conditions & Concerns/Respiratory Conditions/Asthma"
  },
  {
    "CriterionID": 12852,
    "Category": "/Health/Health Conditions & Concerns/Respiratory Conditions/Asthma/Asthma Medicines & Care Products"
  },
  {
    "CriterionID": 11657,
    "Category": "/Health/Health Conditions & Concerns/Respiratory Conditions/Chronic Obstructive Pulmonary Disease (COPD)"
  },
  {
    "CriterionID": 10462,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health"
  },
  {
    "CriterionID": 11674,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning"
  },
  {
    "CriterionID": 12874,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Contraception"
  },
  {
    "CriterionID": 13270,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Contraception/Condoms"
  },
  {
    "CriterionID": 12933,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Contraception/Contraceptive Drugs"
  },
  {
    "CriterionID": 13269,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Contraception/Contraceptive Drugs/Emergency Contraception"
  },
  {
    "CriterionID": 13268,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Contraception/Contraceptive Drugs/Hormonal Contraceptives"
  },
  {
    "CriterionID": 12875,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Fertility & Conception"
  },
  {
    "CriterionID": 12915,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Fertility & Conception/Fertility Monitors & Ovulation Calculators"
  },
  {
    "CriterionID": 11790,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Family Planning/Pregnancy Tests & Testing Services"
  },
  {
    "CriterionID": 11673,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Personal Lubricants"
  },
  {
    "CriterionID": 13749,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sex Education & Counseling"
  },
  {
    "CriterionID": 13721,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexual Enhancements"
  },
  {
    "CriterionID": 11672,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexually Transmitted Diseases (STDs)"
  },
  {
    "CriterionID": 12869,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexually Transmitted Diseases (STDs)/Genital Herpes"
  },
  {
    "CriterionID": 12873,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexually Transmitted Diseases (STDs)/Genital Warts"
  },
  {
    "CriterionID": 12870,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexually Transmitted Diseases (STDs)/Human Papillomavirus (HPV)"
  },
  {
    "CriterionID": 12872,
    "Category": "/Health/Health Conditions & Concerns/Sexual & Reproductive Health/Sexually Transmitted Diseases (STDs)/STD Medications & Treatments"
  },
  {
    "CriterionID": 10473,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health"
  },
  {
    "CriterionID": 11710,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Acne"
  },
  {
    "CriterionID": 12886,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Acne/Acne Medications"
  },
  {
    "CriterionID": 12885,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Acne/Blemish Control"
  },
  {
    "CriterionID": 11711,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Eczema"
  },
  {
    "CriterionID": 12887,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Eczema/Eczema Medications & Creams"
  },
  {
    "CriterionID": 11713,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Psoriasis"
  },
  {
    "CriterionID": 13818,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Psoriasis/Psoriasis Medications & Treatments"
  },
  {
    "CriterionID": 11714,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Rashes & Itches"
  },
  {
    "CriterionID": 12890,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Rashes & Itches/Anti-Itch & Rash Medications"
  },
  {
    "CriterionID": 11715,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Rosacea"
  },
  {
    "CriterionID": 12934,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Skin Condition Medications"
  },
  {
    "CriterionID": 11716,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Skin Fungus"
  },
  {
    "CriterionID": 12892,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Skin Fungus/Skin Fungus Medications"
  },
  {
    "CriterionID": 11712,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Sunburn"
  },
  {
    "CriterionID": 12888,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Sunburn/Sunscreen"
  },
  {
    "CriterionID": 10454,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Warts"
  },
  {
    "CriterionID": 11662,
    "Category": "/Health/Health Conditions & Concerns/Skin Conditions & Skin Health/Warts/Wart Removers"
  },
  {
    "CriterionID": 10453,
    "Category": "/Health/Health Conditions & Concerns/Smoking & Smoking Cessation"
  },
  {
    "CriterionID": 13745,
    "Category": "/Health/Health Conditions & Concerns/Thyroid Conditions"
  },
  {
    "CriterionID": 10458,
    "Category": "/Health/Health Conditions & Concerns/Trauma & Stress Disorder"
  },
  {
    "CriterionID": 10463,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health"
  },
  {
    "CriterionID": 11675,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health/Bladder Cancer"
  },
  {
    "CriterionID": 11676,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health/Incontinence"
  },
  {
    "CriterionID": 11679,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health/Interstitial Cystitis"
  },
  {
    "CriterionID": 11677,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health/Overactive Bladder"
  },
  {
    "CriterionID": 11678,
    "Category": "/Health/Health Conditions & Concerns/Urinary & Bladder Health/Urinary Tract Infections"
  },
  {
    "CriterionID": 10460,
    "Category": "/Health/Health Conditions & Concerns/Vision"
  },
  {
    "CriterionID": 11671,
    "Category": "/Health/Health Conditions & Concerns/Vision/Cataracts"
  },
  {
    "CriterionID": 12867,
    "Category": "/Health/Health Conditions & Concerns/Vision/Contact Lenses & Accessories"
  },
  {
    "CriterionID": 12866,
    "Category": "/Health/Health Conditions & Concerns/Vision/Eyeglass Frames"
  },
  {
    "CriterionID": 12868,
    "Category": "/Health/Health Conditions & Concerns/Vision/Prescription Lenses"
  },
  {
    "CriterionID": 11670,
    "Category": "/Health/Health Conditions & Concerns/Vision/Vision Care Products"
  },
  {
    "CriterionID": 10457,
    "Category": "/Health/Health Conditions & Concerns/Weight Loss"
  },
  {
    "CriterionID": 11669,
    "Category": "/Health/Health Conditions & Concerns/Weight Loss/Weight Loss Products"
  },
  {
    "CriterionID": 12864,
    "Category": "/Health/Health Conditions & Concerns/Weight Loss/Weight Loss Products/Weight Loss Drugs & Medications"
  },
  {
    "CriterionID": 12865,
    "Category": "/Health/Health Conditions & Concerns/Weight Loss/Weight Loss Products/Weight Loss Supplements"
  },
  {
    "CriterionID": 10470,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN"
  },
  {
    "CriterionID": 11704,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/Menopause"
  },
  {
    "CriterionID": 12882,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/Menopause/Hormone Replacement Therapy"
  },
  {
    "CriterionID": 11705,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/PMS"
  },
  {
    "CriterionID": 12883,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/PMS/PMS Relief Medications"
  },
  {
    "CriterionID": 11703,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/Uterine Fibroids & Heavy Periods"
  },
  {
    "CriterionID": 11706,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/Yeast Infections"
  },
  {
    "CriterionID": 12884,
    "Category": "/Health/Health Conditions & Concerns/Women's Health & OBGYN/Yeast Infections/Yeast Infection Remedies"
  },
  {
    "CriterionID": 10087,
    "Category": "/Health/Medical Devices, Equipment & Supplies"
  },
  {
    "CriterionID": 11765,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Bathroom Safety Equipment"
  },
  {
    "CriterionID": 13167,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Defibrillators"
  },
  {
    "CriterionID": 12488,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Exam Tables & Surgery Tables"
  },
  {
    "CriterionID": 10493,
    "Category": "/Health/Medical Devices, Equipment & Supplies/First Aid Supplies"
  },
  {
    "CriterionID": 11759,
    "Category": "/Health/Medical Devices, Equipment & Supplies/First Aid Supplies/Antibiotic & Antiseptic Medications"
  },
  {
    "CriterionID": 11758,
    "Category": "/Health/Medical Devices, Equipment & Supplies/First Aid Supplies/Bandages"
  },
  {
    "CriterionID": 11757,
    "Category": "/Health/Medical Devices, Equipment & Supplies/First Aid Supplies/First Aid Kits"
  },
  {
    "CriterionID": 11756,
    "Category": "/Health/Medical Devices, Equipment & Supplies/First Aid Supplies/Hot & Cold Pads & Packs"
  },
  {
    "CriterionID": 11766,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Hospital Beds, Stretchers & Accessories"
  },
  {
    "CriterionID": 13169,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Infusion Pumps"
  },
  {
    "CriterionID": 11767,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Compression Garments & Stockings"
  },
  {
    "CriterionID": 12494,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices"
  },
  {
    "CriterionID": 12917,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Blood Pressure Monitors & Accessories"
  },
  {
    "CriterionID": 13184,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Body Temperature Thermometers"
  },
  {
    "CriterionID": 12919,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Body Weight Scales"
  },
  {
    "CriterionID": 13176,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Bone Densitometers"
  },
  {
    "CriterionID": 13168,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/CT Scanners"
  },
  {
    "CriterionID": 13166,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/EKG Machines"
  },
  {
    "CriterionID": 13172,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Fetal Monitors"
  },
  {
    "CriterionID": 13171,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/MRI Machines"
  },
  {
    "CriterionID": 12493,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Medical Alarms"
  },
  {
    "CriterionID": 11770,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Personal Health Monitors"
  },
  {
    "CriterionID": 12922,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Personal Health Monitors/Body Fat Monitors"
  },
  {
    "CriterionID": 12920,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Personal Health Monitors/Cholesterol Monitors & Accessories"
  },
  {
    "CriterionID": 12921,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Personal Health Monitors/Heart Rate Monitors"
  },
  {
    "CriterionID": 12916,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Personal Health Monitors/Pedometers"
  },
  {
    "CriterionID": 13182,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Stethoscopes"
  },
  {
    "CriterionID": 13175,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Stress Test Devices"
  },
  {
    "CriterionID": 13173,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Ultrasound Devices"
  },
  {
    "CriterionID": 13165,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/Vital Sign Monitors"
  },
  {
    "CriterionID": 13170,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Diagnostic Equipment & Monitoring Devices/X-Ray Machines"
  },
  {
    "CriterionID": 12492,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Equipment Parts & Accessories"
  },
  {
    "CriterionID": 10495,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Needles, Syringes & Injection Supplies"
  },
  {
    "CriterionID": 12912,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Needles, Syringes & Injection Supplies/Insulin Syringes"
  },
  {
    "CriterionID": 12491,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medical Scrubs"
  },
  {
    "CriterionID": 10496,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Medication Accessories"
  },
  {
    "CriterionID": 10494,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories"
  },
  {
    "CriterionID": 11763,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Canes"
  },
  {
    "CriterionID": 11761,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Crutches & Crutch Accessories"
  },
  {
    "CriterionID": 11760,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Personal Travel Scooters & Accessories"
  },
  {
    "CriterionID": 11762,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Walkers & Rollators"
  },
  {
    "CriterionID": 11236,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Wheelchairs & Wheelchair Accessories"
  },
  {
    "CriterionID": 12479,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Wheelchairs & Wheelchair Accessories/Motorized Wheelchairs"
  },
  {
    "CriterionID": 12480,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Mobility Equipment & Accessories/Wheelchairs & Wheelchair Accessories/Wheelchair Lifts & Ramps"
  },
  {
    "CriterionID": 12481,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Ophthalmological Instruments"
  },
  {
    "CriterionID": 11771,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Orthopedic Braces & Supports"
  },
  {
    "CriterionID": 12487,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Patient Gowns & Garments"
  },
  {
    "CriterionID": 11234,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Professional Dental Equipment & Supplies"
  },
  {
    "CriterionID": 11769,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Prosthetics & Artificial Limbs"
  },
  {
    "CriterionID": 11768,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Reachers & Grabbers"
  },
  {
    "CriterionID": 12490,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Surgical Instruments"
  },
  {
    "CriterionID": 13181,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Surgical Instruments/Forceps"
  },
  {
    "CriterionID": 13178,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Surgical Instruments/Medical Clamps"
  },
  {
    "CriterionID": 13177,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Surgical Instruments/Scalpels & Operating Knives"
  },
  {
    "CriterionID": 13179,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Surgical Instruments/Speculae"
  },
  {
    "CriterionID": 12495,
    "Category": "/Health/Medical Devices, Equipment & Supplies/Utility Medical Equipment"
  },
  {
    "CriterionID": 10086,
    "Category": "/Health/Nutrition & Dieting"
  },
  {
    "CriterionID": 10491,
    "Category": "/Health/Nutrition & Dieting/Diets & Diet Programs"
  },
  {
    "CriterionID": 11755,
    "Category": "/Health/Nutrition & Dieting/Diets & Diet Programs/Health-Related Restricted Diets"
  },
  {
    "CriterionID": 12911,
    "Category": "/Health/Nutrition & Dieting/Diets & Diet Programs/Health-Related Restricted Diets/Low Cholesterol Diets"
  },
  {
    "CriterionID": 12910,
    "Category": "/Health/Nutrition & Dieting/Diets & Diet Programs/Health-Related Restricted Diets/Low Sodium Diets"
  },
  {
    "CriterionID": 11754,
    "Category": "/Health/Nutrition & Dieting/Diets & Diet Programs/Weight Loss Diets & Diet Programs"
  },
  {
    "CriterionID": 10492,
    "Category": "/Health/Nutrition & Dieting/Nutrition Counseling"
  },
  {
    "CriterionID": 10089,
    "Category": "/Health/Pharmacy"
  },
  {
    "CriterionID": 11773,
    "Category": "/Health/Pharmacy/Drugs & Medications"
  },
  {
    "CriterionID": 11772,
    "Category": "/Health/Pharmacy/Vitamins & Supplements"
  },
  {
    "CriterionID": 12927,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Amino Acid Supplements"
  },
  {
    "CriterionID": 12931,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Calcium"
  },
  {
    "CriterionID": 12928,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Essential Fatty Acid & Omega-3s"
  },
  {
    "CriterionID": 12924,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Glucosamine & Chondroitin"
  },
  {
    "CriterionID": 12929,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Iron Supplements"
  },
  {
    "CriterionID": 12930,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Medicinal Herbs & Herbal Supplements"
  },
  {
    "CriterionID": 12926,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Multi-Vitamins"
  },
  {
    "CriterionID": 12923,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Prenatal Pills & Vitamins"
  },
  {
    "CriterionID": 12925,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Protein Supplements"
  },
  {
    "CriterionID": 10118,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Sports Nutrition Supplements"
  },
  {
    "CriterionID": 13707,
    "Category": "/Health/Pharmacy/Vitamins & Supplements/Super Food Supplements"
  },
  {
    "CriterionID": 10090,
    "Category": "/Health/Professional Medical Resources"
  },
  {
    "CriterionID": 10504,
    "Category": "/Health/Professional Medical Resources/Medical Research"
  },
  {
    "CriterionID": 11775,
    "Category": "/Health/Professional Medical Resources/Medical Research/Clinical Trials"
  },
  {
    "CriterionID": 11774,
    "Category": "/Health/Professional Medical Resources/Medical Research/Stem Cell Research"
  },
  {
    "CriterionID": 10505,
    "Category": "/Health/Professional Medical Resources/Professional Health Care Education"
  },
  {
    "CriterionID": 11778,
    "Category": "/Health/Professional Medical Resources/Professional Health Care Education/Allopathic Medicine Education"
  },
  {
    "CriterionID": 11776,
    "Category": "/Health/Professional Medical Resources/Professional Health Care Education/Non-Western & Complementary Health Education"
  },
  {
    "CriterionID": 10015,
    "Category": "/Hobbies & Leisure"
  },
  {
    "CriterionID": 10133,
    "Category": "/Hobbies & Leisure/Ancestry & Genealogy"
  },
  {
    "CriterionID": 10135,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles"
  },
  {
    "CriterionID": 11526,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique & Art Refinishing & Restoration"
  },
  {
    "CriterionID": 12008,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique & Collectible Auctions"
  },
  {
    "CriterionID": 13820,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique & Collectible Stamps"
  },
  {
    "CriterionID": 12007,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Appraisals"
  },
  {
    "CriterionID": 10738,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Books & Manuscripts"
  },
  {
    "CriterionID": 10725,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Ceramics & Pottery"
  },
  {
    "CriterionID": 10702,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Clocks & Watches"
  },
  {
    "CriterionID": 11998,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Clocks & Watches/Antique Clocks"
  },
  {
    "CriterionID": 11999,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Clocks & Watches/Antique Watches"
  },
  {
    "CriterionID": 10730,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Coins & Collectible Money"
  },
  {
    "CriterionID": 10739,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Glassware & Art Glass"
  },
  {
    "CriterionID": 10727,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Lamps & Lighting"
  },
  {
    "CriterionID": 10708,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Maps & Geographical Artifacts"
  },
  {
    "CriterionID": 10716,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Antique Rugs & Carpets"
  },
  {
    "CriterionID": 10719,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Asian Antiques"
  },
  {
    "CriterionID": 10734,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Autographs"
  },
  {
    "CriterionID": 10722,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Bric-A-Brac"
  },
  {
    "CriterionID": 10724,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Hardware & Tools"
  },
  {
    "CriterionID": 10712,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Metal Ware"
  },
  {
    "CriterionID": 12000,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Metal Ware/Antique Silver"
  },
  {
    "CriterionID": 10718,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Pins"
  },
  {
    "CriterionID": 10733,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Postcards"
  },
  {
    "CriterionID": 10714,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Telephones, Typewriters & Electronics"
  },
  {
    "CriterionID": 10706,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Textiles & Linen"
  },
  {
    "CriterionID": 10720,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Collectible Toys & Games"
  },
  {
    "CriterionID": 10705,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/European Antiques"
  },
  {
    "CriterionID": 10736,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Fantasy & Magical Collectibles"
  },
  {
    "CriterionID": 10699,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Figurines"
  },
  {
    "CriterionID": 13698,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Flea Markets & Swap Meets"
  },
  {
    "CriterionID": 10703,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Folk Art & Ethnographic Antiques"
  },
  {
    "CriterionID": 10704,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Game Room Collectibles"
  },
  {
    "CriterionID": 10715,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Garden Antiques"
  },
  {
    "CriterionID": 10728,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Holiday & Seasonal Collectibles"
  },
  {
    "CriterionID": 10701,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Memorabilia"
  },
  {
    "CriterionID": 11995,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Memorabilia/Movie & TV Show Memorabilia"
  },
  {
    "CriterionID": 11997,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Memorabilia/Music Art & Memorabilia"
  },
  {
    "CriterionID": 11996,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Memorabilia/Sports Memorabilia"
  },
  {
    "CriterionID": 10717,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Militaria"
  },
  {
    "CriterionID": 10713,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Rocks, Minerals & Fossils"
  },
  {
    "CriterionID": 13825,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Swords, Knives & Daggers"
  },
  {
    "CriterionID": 10729,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Trading Cards"
  },
  {
    "CriterionID": 12004,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Trading Cards/Adventure Trading Cards"
  },
  {
    "CriterionID": 12005,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Trading Cards/Automotive Trading Cards"
  },
  {
    "CriterionID": 12003,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Trading Cards/Sports Trading Cards"
  },
  {
    "CriterionID": 10711,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Vintage & Antique Buttons"
  },
  {
    "CriterionID": 10737,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Vintage & Antique Transportation"
  },
  {
    "CriterionID": 12009,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Vintage & Antique Transportation/Classic Cars"
  },
  {
    "CriterionID": 10707,
    "Category": "/Hobbies & Leisure/Antiques & Collectibles/Vintage Advertising & Media"
  },
  {
    "CriterionID": 10131,
    "Category": "/Hobbies & Leisure/Arts & Crafts"
  },
  {
    "CriterionID": 11983,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Beading & Beadwork"
  },
  {
    "CriterionID": 10900,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Beading & Beadwork/Charms & Beads"
  },
  {
    "CriterionID": 11984,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Ceramic & Glass Equipment & Supplies"
  },
  {
    "CriterionID": 11987,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft"
  },
  {
    "CriterionID": 13018,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft/Fabric"
  },
  {
    "CriterionID": 13017,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft/Knitting"
  },
  {
    "CriterionID": 11306,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft/Knitting/Yarns"
  },
  {
    "CriterionID": 13373,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft/Sewing Machines"
  },
  {
    "CriterionID": 11302,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Fiber Craft/Threads"
  },
  {
    "CriterionID": 13865,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Paper Crafts"
  },
  {
    "CriterionID": 11986,
    "Category": "/Hobbies & Leisure/Arts & Crafts/Scrapbooking"
  },
  {
    "CriterionID": 13569,
    "Category": "/Hobbies & Leisure/Astronomy"
  },
  {
    "CriterionID": 13796,
    "Category": "/Hobbies & Leisure/Astronomy/Name A Star"
  },
  {
    "CriterionID": 10134,
    "Category": "/Hobbies & Leisure/Birding"
  },
  {
    "CriterionID": 11994,
    "Category": "/Hobbies & Leisure/Birding/Wild Bird Supplies"
  },
  {
    "CriterionID": 10113,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation"
  },
  {
    "CriterionID": 11889,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Backpacking & Camping Food"
  },
  {
    "CriterionID": 11312,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Binoculars"
  },
  {
    "CriterionID": 11888,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Camp Cooking Equipment"
  },
  {
    "CriterionID": 10615,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Climbing"
  },
  {
    "CriterionID": 11892,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Climbing/Carabiners"
  },
  {
    "CriterionID": 11891,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Climbing/Climbing Ropes & Cords"
  },
  {
    "CriterionID": 10612,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Flashlights & Lanterns"
  },
  {
    "CriterionID": 10616,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Hiking"
  },
  {
    "CriterionID": 11894,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Hiking/Hiking Boots"
  },
  {
    "CriterionID": 13428,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Multi-tools & Pocket Knives"
  },
  {
    "CriterionID": 11890,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Outdoor Sleeping Gear"
  },
  {
    "CriterionID": 12976,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Outdoor Sleeping Gear/Portable Beds"
  },
  {
    "CriterionID": 12978,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Outdoor Sleeping Gear/Sleeping Bags"
  },
  {
    "CriterionID": 12977,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Outdoor Sleeping Gear/Sleeping Mats & Pads"
  },
  {
    "CriterionID": 10614,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Portable Ice Chests & Picnic Coolers"
  },
  {
    "CriterionID": 11887,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Tents"
  },
  {
    "CriterionID": 13752,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Water Containers, Bottles & Hydration Packs"
  },
  {
    "CriterionID": 13754,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Water Containers, Bottles & Hydration Packs/Hydration Packs & Personal Water Reservoirs"
  },
  {
    "CriterionID": 13753,
    "Category": "/Hobbies & Leisure/Camping & Outdoor Recreation/Water Containers, Bottles & Hydration Packs/Reusable Water Bottles"
  },
  {
    "CriterionID": 10128,
    "Category": "/Hobbies & Leisure/Cooking"
  },
  {
    "CriterionID": 11559,
    "Category": "/Hobbies & Leisure/Cooking/Cooking Media & Publications"
  },
  {
    "CriterionID": 10889,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines"
  },
  {
    "CriterionID": 13792,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Asian Cuisine"
  },
  {
    "CriterionID": 12226,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Asian Cuisine/Chinese Cuisine"
  },
  {
    "CriterionID": 12227,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Asian Cuisine/Japanese Cuisine"
  },
  {
    "CriterionID": 13790,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/French Cuisine"
  },
  {
    "CriterionID": 12230,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Indian Cuisine"
  },
  {
    "CriterionID": 13805,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Latin American Cuisine"
  },
  {
    "CriterionID": 12225,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Latin American Cuisine/Mexican Cuisine"
  },
  {
    "CriterionID": 13791,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Mediterranean Cuisine"
  },
  {
    "CriterionID": 12229,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Mediterranean Cuisine/Italian Cuisine"
  },
  {
    "CriterionID": 13788,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Mediterranean Cuisine/Spanish Cuisine"
  },
  {
    "CriterionID": 13735,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Raw Foods & Raw Foodism"
  },
  {
    "CriterionID": 13652,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Vegetarian Cuisine"
  },
  {
    "CriterionID": 11638,
    "Category": "/Hobbies & Leisure/Cooking/Cuisines/Vegetarian Cuisine/Vegetarian & Vegan Foods"
  },
  {
    "CriterionID": 10679,
    "Category": "/Hobbies & Leisure/Cooking/Recipes"
  },
  {
    "CriterionID": 13456,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Dessert Recipes"
  },
  {
    "CriterionID": 13011,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Diabetic & Low Sugar Recipes"
  },
  {
    "CriterionID": 11958,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Meat & Seafood Recipes"
  },
  {
    "CriterionID": 13009,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Meat & Seafood Recipes/Chicken & Poultry Recipes"
  },
  {
    "CriterionID": 13455,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Vegetarian Recipes"
  },
  {
    "CriterionID": 11957,
    "Category": "/Hobbies & Leisure/Cooking/Recipes/Weight Loss & Reduced Calorie Diet Recipes"
  },
  {
    "CriterionID": 13658,
    "Category": "/Hobbies & Leisure/Gardening"
  },
  {
    "CriterionID": 12776,
    "Category": "/Hobbies & Leisure/Gardening/Garden Fountains & Water Features"
  },
  {
    "CriterionID": 11542,
    "Category": "/Hobbies & Leisure/Gardening/Garden Ornaments & Statuary"
  },
  {
    "CriterionID": 12777,
    "Category": "/Hobbies & Leisure/Gardening/Garden Structures"
  },
  {
    "CriterionID": 13249,
    "Category": "/Hobbies & Leisure/Gardening/Garden Structures/Garden Sheds"
  },
  {
    "CriterionID": 13248,
    "Category": "/Hobbies & Leisure/Gardening/Garden Structures/Greenhouses & Conservatories"
  },
  {
    "CriterionID": 11544,
    "Category": "/Hobbies & Leisure/Gardening/Gardening Books & Publications"
  },
  {
    "CriterionID": 13374,
    "Category": "/Hobbies & Leisure/Gardening/Trees, Plants & Shrubs"
  },
  {
    "CriterionID": 11545,
    "Category": "/Hobbies & Leisure/Gardening/Yard & Garden Accessories"
  },
  {
    "CriterionID": 10130,
    "Category": "/Hobbies & Leisure/Pets & Animals"
  },
  {
    "CriterionID": 11982,
    "Category": "/Hobbies & Leisure/Pets & Animals/Animal Adoption & Rescue"
  },
  {
    "CriterionID": 13015,
    "Category": "/Hobbies & Leisure/Pets & Animals/Dog Walking"
  },
  {
    "CriterionID": 11981,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet & Animal Training"
  },
  {
    "CriterionID": 11980,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Breeding"
  },
  {
    "CriterionID": 10683,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies"
  },
  {
    "CriterionID": 11965,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Flea & Tick Control Products"
  },
  {
    "CriterionID": 11968,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Carriers"
  },
  {
    "CriterionID": 11961,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Dishes & Feeders"
  },
  {
    "CriterionID": 11963,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Food & Treats"
  },
  {
    "CriterionID": 11966,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Habitats, Perches & Beds"
  },
  {
    "CriterionID": 11967,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Leashes & Collars"
  },
  {
    "CriterionID": 11962,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Litter & Supplies"
  },
  {
    "CriterionID": 11964,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Medications"
  },
  {
    "CriterionID": 11960,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Food & Supplies/Pet Toys"
  },
  {
    "CriterionID": 11977,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Grooming"
  },
  {
    "CriterionID": 11978,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pet Sitting, Pet Boarding & Pet Day Care"
  },
  {
    "CriterionID": 10684,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed"
  },
  {
    "CriterionID": 11970,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Birds"
  },
  {
    "CriterionID": 11973,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Cats"
  },
  {
    "CriterionID": 11969,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Dogs"
  },
  {
    "CriterionID": 13013,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Dogs/Large Dogs"
  },
  {
    "CriterionID": 13014,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Dogs/Small Dogs"
  },
  {
    "CriterionID": 11972,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Exotic Pets"
  },
  {
    "CriterionID": 11974,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Fish & Aquaria"
  },
  {
    "CriterionID": 11975,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Horses"
  },
  {
    "CriterionID": 11971,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Rabbits & Rodents"
  },
  {
    "CriterionID": 11976,
    "Category": "/Hobbies & Leisure/Pets & Animals/Pets By Breed/Reptiles & Amphibians"
  },
  {
    "CriterionID": 11979,
    "Category": "/Hobbies & Leisure/Pets & Animals/Veterinary"
  },
  {
    "CriterionID": 13878,
    "Category": "/Hobbies & Leisure/Pets & Animals/Wildlife"
  },
  {
    "CriterionID": 10132,
    "Category": "/Hobbies & Leisure/Photo & Video"
  },
  {
    "CriterionID": 10691,
    "Category": "/Hobbies & Leisure/Photo & Video/Digital Cameras"
  },
  {
    "CriterionID": 11989,
    "Category": "/Hobbies & Leisure/Photo & Video/Digital Cameras/SLR Cameras"
  },
  {
    "CriterionID": 10694,
    "Category": "/Hobbies & Leisure/Photo & Video/Film Cameras"
  },
  {
    "CriterionID": 10693,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo & Video Accessories"
  },
  {
    "CriterionID": 11991,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo & Video Accessories/Camera Bags"
  },
  {
    "CriterionID": 11993,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo & Video Accessories/Camera Batteries"
  },
  {
    "CriterionID": 11992,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo & Video Accessories/Video Camera & Camcorder Batteries"
  },
  {
    "CriterionID": 10689,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo & Video Publications"
  },
  {
    "CriterionID": 13802,
    "Category": "/Hobbies & Leisure/Photo & Video/Photo Printing"
  },
  {
    "CriterionID": 13596,
    "Category": "/Hobbies & Leisure/Photo & Video/Photographic & Digital Arts"
  },
  {
    "CriterionID": 12011,
    "Category": "/Hobbies & Leisure/Photo & Video/Photography & Videography Classes"
  },
  {
    "CriterionID": 10692,
    "Category": "/Hobbies & Leisure/Photo & Video/Video Cameras & Camcorders"
  },
  {
    "CriterionID": 13405,
    "Category": "/Hobbies & Leisure/Prizes & Competitions"
  },
  {
    "CriterionID": 13681,
    "Category": "/Hobbies & Leisure/Prizes & Competitions/Contests, Pageants & Merit Prizes"
  },
  {
    "CriterionID": 13682,
    "Category": "/Hobbies & Leisure/Prizes & Competitions/Contests, Pageants & Merit Prizes/Beauty Pageants"
  },
  {
    "CriterionID": 13685,
    "Category": "/Hobbies & Leisure/Prizes & Competitions/Contests, Pageants & Merit Prizes/Cooking & Recipe Contests"
  },
  {
    "CriterionID": 13683,
    "Category": "/Hobbies & Leisure/Prizes & Competitions/Contests, Pageants & Merit Prizes/Photo Contests"
  },
  {
    "CriterionID": 13680,
    "Category": "/Hobbies & Leisure/Prizes & Competitions/Sweepstakes, Product Promotions & Giveaways"
  },
  {
    "CriterionID": 10136,
    "Category": "/Hobbies & Leisure/Recreational Activity Education"
  },
  {
    "CriterionID": 10740,
    "Category": "/Hobbies & Leisure/Recreational Activity Education/Recreational Activity Lessons & Classes"
  },
  {
    "CriterionID": 12010,
    "Category": "/Hobbies & Leisure/Recreational Activity Education/Recreational Activity Lessons & Classes/Fiber Craft Classes"
  },
  {
    "CriterionID": 10129,
    "Category": "/Hobbies & Leisure/Scale Models & Model Building"
  },
  {
    "CriterionID": 10125,
    "Category": "/Hobbies & Leisure/Toys & Games"
  },
  {
    "CriterionID": 10672,
    "Category": "/Hobbies & Leisure/Toys & Games/Games"
  },
  {
    "CriterionID": 11949,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Arcade & Coin-Op Games"
  },
  {
    "CriterionID": 11948,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Board Games"
  },
  {
    "CriterionID": 11943,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Card Games"
  },
  {
    "CriterionID": 12998,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Card Games/Collectible Card Games"
  },
  {
    "CriterionID": 13794,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Children's Games & Activities"
  },
  {
    "CriterionID": 11952,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Game Cheats & Hints"
  },
  {
    "CriterionID": 11942,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Online Games & Puzzles"
  },
  {
    "CriterionID": 12997,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Online Games & Puzzles/Massive Multiplayer Online Games"
  },
  {
    "CriterionID": 13798,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Party Games"
  },
  {
    "CriterionID": 11944,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Puzzles & Brainteasers"
  },
  {
    "CriterionID": 11945,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Roleplaying Games"
  },
  {
    "CriterionID": 11946,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Strategy Games"
  },
  {
    "CriterionID": 11947,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Table Games"
  },
  {
    "CriterionID": 12999,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Table Games/Pool & Billiards"
  },
  {
    "CriterionID": 11950,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories"
  },
  {
    "CriterionID": 13377,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games"
  },
  {
    "CriterionID": 13863,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Action & Platform Games"
  },
  {
    "CriterionID": 13584,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Adventure Games"
  },
  {
    "CriterionID": 13585,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Casual Games"
  },
  {
    "CriterionID": 13586,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Driving & Racing Games"
  },
  {
    "CriterionID": 13834,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Family & Children's Games"
  },
  {
    "CriterionID": 13587,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Fighting Games"
  },
  {
    "CriterionID": 13694,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Free-To-Play Games"
  },
  {
    "CriterionID": 13588,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Music & Dance Games"
  },
  {
    "CriterionID": 13589,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Shooter Games"
  },
  {
    "CriterionID": 13590,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Simulation Games"
  },
  {
    "CriterionID": 13591,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Computer & Video Games/Sports Games"
  },
  {
    "CriterionID": 13000,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Power Leveling & Gold Farming"
  },
  {
    "CriterionID": 13376,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Consoles"
  },
  {
    "CriterionID": 13382,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Consoles/Handheld Game Consoles"
  },
  {
    "CriterionID": 13383,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Consoles/Nintendo"
  },
  {
    "CriterionID": 13384,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Consoles/Sony PlayStation"
  },
  {
    "CriterionID": 13385,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Consoles/Xbox"
  },
  {
    "CriterionID": 13003,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Downloads"
  },
  {
    "CriterionID": 13457,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Mods & Console Repair"
  },
  {
    "CriterionID": 13004,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Retailers"
  },
  {
    "CriterionID": 13592,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Reviews & Ratings"
  },
  {
    "CriterionID": 13593,
    "Category": "/Hobbies & Leisure/Toys & Games/Games/Video Games, Consoles & Accessories/Video Game Subscriptions"
  },
  {
    "CriterionID": 10671,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys"
  },
  {
    "CriterionID": 11941,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Action Figures"
  },
  {
    "CriterionID": 11934,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys"
  },
  {
    "CriterionID": 12991,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Baby Activity Gyms"
  },
  {
    "CriterionID": 12993,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Baby Blocks"
  },
  {
    "CriterionID": 12994,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Baby Rattles"
  },
  {
    "CriterionID": 12992,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Developmental Toys"
  },
  {
    "CriterionID": 12989,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Teethers"
  },
  {
    "CriterionID": 12990,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Baby Toys/Tub Toys"
  },
  {
    "CriterionID": 11929,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Building Toys"
  },
  {
    "CriterionID": 11937,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Children's Dolls, Dress-Up Toys & Costumes"
  },
  {
    "CriterionID": 11931,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Children's Dolls, Dress-Up Toys & Costumes/Dolls & Accessories"
  },
  {
    "CriterionID": 13488,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Children's Dolls, Dress-Up Toys & Costumes/Online Doll Dress-Up & Girl Games"
  },
  {
    "CriterionID": 13812,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Die-cast & Toy Vehicles"
  },
  {
    "CriterionID": 11940,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Educational Toys"
  },
  {
    "CriterionID": 11938,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Music Toys"
  },
  {
    "CriterionID": 11933,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Outdoor Toys"
  },
  {
    "CriterionID": 12988,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Outdoor Toys/Kiddie Pools"
  },
  {
    "CriterionID": 11539,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Outdoor Toys/Outdoor Playsets & Swingsets"
  },
  {
    "CriterionID": 11939,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Radio Controlled Toys & Accessories"
  },
  {
    "CriterionID": 11936,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Ride-On Toys"
  },
  {
    "CriterionID": 12995,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Ride-On Toys/Ride-On Toy Vehicles"
  },
  {
    "CriterionID": 11930,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Sports Toys"
  },
  {
    "CriterionID": 11932,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Stuffed Toys"
  },
  {
    "CriterionID": 11953,
    "Category": "/Hobbies & Leisure/Toys & Games/Toys/Toy Recalls"
  },
  {
    "CriterionID": 10126,
    "Category": "/Hobbies & Leisure/Wine & Beer Collecting & Brewing"
  },
  {
    "CriterionID": 10675,
    "Category": "/Hobbies & Leisure/Wine & Beer Collecting & Brewing/Home Brewing & Wine Making"
  },
  {
    "CriterionID": 10674,
    "Category": "/Hobbies & Leisure/Wine & Beer Collecting & Brewing/Wine Collecting"
  },
  {
    "CriterionID": 13007,
    "Category": "/Hobbies & Leisure/Wine & Beer Collecting & Brewing/Wine Collecting/Wine Auctions"
  },
  {
    "CriterionID": 13008,
    "Category": "/Hobbies & Leisure/Wine & Beer Collecting & Brewing/Wine Collecting/Wine Clubs"
  },
  {
    "CriterionID": 10009,
    "Category": "/Home & Garden"
  },
  {
    "CriterionID": 10415,
    "Category": "/Home & Garden/Bathroom"
  },
  {
    "CriterionID": 11579,
    "Category": "/Home & Garden/Bathroom/Bath Mats & Rugs"
  },
  {
    "CriterionID": 11580,
    "Category": "/Home & Garden/Bathroom/Bathroom Accessories"
  },
  {
    "CriterionID": 11575,
    "Category": "/Home & Garden/Bathroom/Bathroom Towels"
  },
  {
    "CriterionID": 13363,
    "Category": "/Home & Garden/Bathroom/Medicine Cabinets"
  },
  {
    "CriterionID": 11578,
    "Category": "/Home & Garden/Bathroom/Shower Curtains & Accessories"
  },
  {
    "CriterionID": 11576,
    "Category": "/Home & Garden/Bathroom/Toilet Accessories"
  },
  {
    "CriterionID": 11577,
    "Category": "/Home & Garden/Bathroom/Towel Bars & Hooks"
  },
  {
    "CriterionID": 11589,
    "Category": "/Home & Garden/Bedding & Linens"
  },
  {
    "CriterionID": 12825,
    "Category": "/Home & Garden/Bedding & Linens/Blankets & Bedspreads"
  },
  {
    "CriterionID": 12823,
    "Category": "/Home & Garden/Bedding & Linens/Duvet Covers & Duvets"
  },
  {
    "CriterionID": 12824,
    "Category": "/Home & Garden/Bedding & Linens/Pillows"
  },
  {
    "CriterionID": 13447,
    "Category": "/Home & Garden/Bedding & Linens/Quilts"
  },
  {
    "CriterionID": 12826,
    "Category": "/Home & Garden/Bedding & Linens/Sheets & Pillowcases"
  },
  {
    "CriterionID": 13650,
    "Category": "/Home & Garden/Doorbells & Door Knockers"
  },
  {
    "CriterionID": 10414,
    "Category": "/Home & Garden/Home & Garden Media & Publications"
  },
  {
    "CriterionID": 10412,
    "Category": "/Home & Garden/Home Appliances"
  },
  {
    "CriterionID": 11565,
    "Category": "/Home & Garden/Home Appliances/Floor Cleaners & Accessories"
  },
  {
    "CriterionID": 12796,
    "Category": "/Home & Garden/Home Appliances/Floor Cleaners & Accessories/Hard-Floor Cleaners & Accessories"
  },
  {
    "CriterionID": 12797,
    "Category": "/Home & Garden/Home Appliances/Floor Cleaners & Accessories/Vacuum Cleaners & Accessories"
  },
  {
    "CriterionID": 11527,
    "Category": "/Home & Garden/Home Appliances/Home Appliance Service & Repair"
  },
  {
    "CriterionID": 11564,
    "Category": "/Home & Garden/Home Appliances/Laundry Room Appliances"
  },
  {
    "CriterionID": 12794,
    "Category": "/Home & Garden/Home Appliances/Laundry Room Appliances/Clothes Irons & Garment Steamers"
  },
  {
    "CriterionID": 12795,
    "Category": "/Home & Garden/Home Appliances/Laundry Room Appliances/Washers & Dryers"
  },
  {
    "CriterionID": 11567,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances"
  },
  {
    "CriterionID": 12804,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Dishwashers"
  },
  {
    "CriterionID": 12807,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Kitchen Hoods & Vents"
  },
  {
    "CriterionID": 12806,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Microwaves"
  },
  {
    "CriterionID": 12808,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Ranges, Cooktops & Ovens"
  },
  {
    "CriterionID": 12805,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Refrigerators & Freezers"
  },
  {
    "CriterionID": 13254,
    "Category": "/Home & Garden/Home Appliances/Major Kitchen Appliances/Refrigerators & Freezers/Kegerators & Beer Coolers"
  },
  {
    "CriterionID": 10405,
    "Category": "/Home & Garden/Home Decor & Interior Decorating"
  },
  {
    "CriterionID": 11536,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Art Glass"
  },
  {
    "CriterionID": 11533,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Candles & Incense"
  },
  {
    "CriterionID": 11529,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Ceramics, Porcelain & Vases"
  },
  {
    "CriterionID": 11531,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Clocks"
  },
  {
    "CriterionID": 11530,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Decorative Fountains"
  },
  {
    "CriterionID": 11535,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Decorative Throws & Pillows"
  },
  {
    "CriterionID": 11532,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Flower Pots & Planters"
  },
  {
    "CriterionID": 11534,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Mirrors"
  },
  {
    "CriterionID": 13673,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Picture Frames"
  },
  {
    "CriterionID": 10409,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Residential Ceiling Fans"
  },
  {
    "CriterionID": 11528,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Wall Paper"
  },
  {
    "CriterionID": 10416,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Window Treatments"
  },
  {
    "CriterionID": 11582,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Window Treatments/Blinds, Shades & Shutters"
  },
  {
    "CriterionID": 11581,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Window Treatments/Curtain Rods & Hardware"
  },
  {
    "CriterionID": 11583,
    "Category": "/Home & Garden/Home Decor & Interior Decorating/Window Treatments/Curtains"
  },
  {
    "CriterionID": 10413,
    "Category": "/Home & Garden/Home Furniture"
  },
  {
    "CriterionID": 11573,
    "Category": "/Home & Garden/Home Furniture/Antique Furniture"
  },
  {
    "CriterionID": 11570,
    "Category": "/Home & Garden/Home Furniture/Bathroom Furniture"
  },
  {
    "CriterionID": 11571,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture"
  },
  {
    "CriterionID": 12812,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Beds & Headboards"
  },
  {
    "CriterionID": 13260,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Beds & Headboards/Mattresses"
  },
  {
    "CriterionID": 13261,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Beds & Headboards/Waterbeds & Accessories"
  },
  {
    "CriterionID": 12813,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Clothing & Shoe Storage"
  },
  {
    "CriterionID": 13263,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Clothing & Shoe Storage/Dressers"
  },
  {
    "CriterionID": 12782,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Clothing & Shoe Storage/Shoe Racks & Storage"
  },
  {
    "CriterionID": 13262,
    "Category": "/Home & Garden/Home Furniture/Bedroom Furniture/Clothing & Shoe Storage/Wardrobes & Armoires"
  },
  {
    "CriterionID": 10402,
    "Category": "/Home & Garden/Home Furniture/Furniture Refinishing, Repair & Reupholstery"
  },
  {
    "CriterionID": 11572,
    "Category": "/Home & Garden/Home Furniture/Home Office Furniture"
  },
  {
    "CriterionID": 11568,
    "Category": "/Home & Garden/Home Furniture/Kitchen & Dining Room Furniture"
  },
  {
    "CriterionID": 13407,
    "Category": "/Home & Garden/Home Furniture/Kitchen & Dining Room Furniture/Folding Tables & Chairs"
  },
  {
    "CriterionID": 12810,
    "Category": "/Home & Garden/Home Furniture/Kitchen & Dining Room Furniture/Kitchen & Dining Room Chairs"
  },
  {
    "CriterionID": 12809,
    "Category": "/Home & Garden/Home Furniture/Kitchen & Dining Room Furniture/Kitchen & Dining Room Tables"
  },
  {
    "CriterionID": 11574,
    "Category": "/Home & Garden/Home Furniture/Living Room Furniture"
  },
  {
    "CriterionID": 12819,
    "Category": "/Home & Garden/Home Furniture/Living Room Furniture/Coffee Tables & End Tables"
  },
  {
    "CriterionID": 12817,
    "Category": "/Home & Garden/Home Furniture/Living Room Furniture/Entertainment & Media Centers"
  },
  {
    "CriterionID": 12818,
    "Category": "/Home & Garden/Home Furniture/Living Room Furniture/Sofas & Chairs"
  },
  {
    "CriterionID": 13256,
    "Category": "/Home & Garden/Home Furniture/Living Room Furniture/Sofas & Chairs/Rocking Chairs"
  },
  {
    "CriterionID": 11569,
    "Category": "/Home & Garden/Home Furniture/Playroom & Children's Furniture"
  },
  {
    "CriterionID": 10418,
    "Category": "/Home & Garden/Home Heating & Cooling"
  },
  {
    "CriterionID": 11585,
    "Category": "/Home & Garden/Home Heating & Cooling/Desk Fans & Stand Fans"
  },
  {
    "CriterionID": 13708,
    "Category": "/Home & Garden/Home Heating & Cooling/Fireplaces, Wood Stoves & Pellet Stoves"
  },
  {
    "CriterionID": 11586,
    "Category": "/Home & Garden/Home Heating & Cooling/Thermostats"
  },
  {
    "CriterionID": 10404,
    "Category": "/Home & Garden/Home Improvement & Maintenance"
  },
  {
    "CriterionID": 10417,
    "Category": "/Home & Garden/Home Laundry"
  },
  {
    "CriterionID": 11584,
    "Category": "/Home & Garden/Home Laundry/Ironing Boards & Ironing Centers"
  },
  {
    "CriterionID": 10411,
    "Category": "/Home & Garden/Home Safety & Security"
  },
  {
    "CriterionID": 11563,
    "Category": "/Home & Garden/Home Safety & Security/Fire Extinguishers"
  },
  {
    "CriterionID": 11562,
    "Category": "/Home & Garden/Home Safety & Security/In-Home Hazard Detectors"
  },
  {
    "CriterionID": 12793,
    "Category": "/Home & Garden/Home Safety & Security/In-Home Hazard Detectors/Carbon Monoxide Detectors"
  },
  {
    "CriterionID": 12792,
    "Category": "/Home & Garden/Home Safety & Security/In-Home Hazard Detectors/Smoke Detectors"
  },
  {
    "CriterionID": 11561,
    "Category": "/Home & Garden/Home Safety & Security/Lockboxes & Hide-A-Keys"
  },
  {
    "CriterionID": 10408,
    "Category": "/Home & Garden/Home Storage & Organization"
  },
  {
    "CriterionID": 11547,
    "Category": "/Home & Garden/Home Storage & Organization/Closet Organizing Components & Systems"
  },
  {
    "CriterionID": 12780,
    "Category": "/Home & Garden/Home Storage & Organization/Closet Organizing Components & Systems/Clothes Storage Boxes"
  },
  {
    "CriterionID": 11550,
    "Category": "/Home & Garden/Home Storage & Organization/Laundry Storage & Organization"
  },
  {
    "CriterionID": 11549,
    "Category": "/Home & Garden/Home Storage & Organization/Wine Racks & Storage Systems"
  },
  {
    "CriterionID": 12783,
    "Category": "/Home & Garden/Home Storage & Organization/Wine Racks & Storage Systems/Wine Coolers & Refrigerators"
  },
  {
    "CriterionID": 11282,
    "Category": "/Home & Garden/Kitchen & Bathroom Cabinets"
  },
  {
    "CriterionID": 10410,
    "Category": "/Home & Garden/Kitchen & Dining"
  },
  {
    "CriterionID": 11557,
    "Category": "/Home & Garden/Kitchen & Dining/Bakeware"
  },
  {
    "CriterionID": 11551,
    "Category": "/Home & Garden/Kitchen & Dining/Canning & Preserving"
  },
  {
    "CriterionID": 13387,
    "Category": "/Home & Garden/Kitchen & Dining/Cookie Jars & Bread Boxes"
  },
  {
    "CriterionID": 11556,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets"
  },
  {
    "CriterionID": 12786,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Ceramic Baking Dishes"
  },
  {
    "CriterionID": 12784,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Grills & Griddles"
  },
  {
    "CriterionID": 12785,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Pots & Pans"
  },
  {
    "CriterionID": 13679,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Pots & Pans/Cast Iron Pans"
  },
  {
    "CriterionID": 13678,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Pots & Pans/Non-Stick Pans"
  },
  {
    "CriterionID": 13252,
    "Category": "/Home & Garden/Kitchen & Dining/Cookware & Cookware Sets/Pots & Pans/Soup & Stock Pots"
  },
  {
    "CriterionID": 11560,
    "Category": "/Home & Garden/Kitchen & Dining/Cutlery & Cutting Accessories"
  },
  {
    "CriterionID": 12791,
    "Category": "/Home & Garden/Kitchen & Dining/Cutlery & Cutting Accessories/Cutting Boards"
  },
  {
    "CriterionID": 12790,
    "Category": "/Home & Garden/Kitchen & Dining/Cutlery & Cutting Accessories/Kitchen Knives"
  },
  {
    "CriterionID": 13370,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Accessories"
  },
  {
    "CriterionID": 11553,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Accessories/Cooking Aprons"
  },
  {
    "CriterionID": 12789,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Accessories/Oven Mitts & Trivets"
  },
  {
    "CriterionID": 11558,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Linens"
  },
  {
    "CriterionID": 12788,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Linens/Dishtowels & Dish Cloths"
  },
  {
    "CriterionID": 12787,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Linens/Tablecloths & Napkins"
  },
  {
    "CriterionID": 13386,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Storage"
  },
  {
    "CriterionID": 11548,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Storage/Pot Racks"
  },
  {
    "CriterionID": 11555,
    "Category": "/Home & Garden/Kitchen & Dining/Kitchen Utensils & Gadgets"
  },
  {
    "CriterionID": 11552,
    "Category": "/Home & Garden/Kitchen & Dining/Plates & Serving Dishes"
  },
  {
    "CriterionID": 11554,
    "Category": "/Home & Garden/Kitchen & Dining/Silverware"
  },
  {
    "CriterionID": 11566,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances"
  },
  {
    "CriterionID": 13641,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Blenders"
  },
  {
    "CriterionID": 12801,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Bread Makers"
  },
  {
    "CriterionID": 12803,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Coffee & Espresso Makers"
  },
  {
    "CriterionID": 12799,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Food Processors"
  },
  {
    "CriterionID": 12802,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Mixers"
  },
  {
    "CriterionID": 13829,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Rice Cookers"
  },
  {
    "CriterionID": 12798,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Toasters & Toaster Ovens"
  },
  {
    "CriterionID": 12800,
    "Category": "/Home & Garden/Kitchen & Dining/Small Kitchen Appliances/Waffle Irons"
  },
  {
    "CriterionID": 10419,
    "Category": "/Home & Garden/Lights & Lighting"
  },
  {
    "CriterionID": 11587,
    "Category": "/Home & Garden/Lights & Lighting/Lamps & Lamp Shades"
  },
  {
    "CriterionID": 12821,
    "Category": "/Home & Garden/Lights & Lighting/Lamps & Lamp Shades/Lamp Shades"
  },
  {
    "CriterionID": 12820,
    "Category": "/Home & Garden/Lights & Lighting/Lamps & Lamp Shades/Lamps"
  },
  {
    "CriterionID": 13264,
    "Category": "/Home & Garden/Lights & Lighting/Lamps & Lamp Shades/Lamps/Floor Lamps"
  },
  {
    "CriterionID": 11588,
    "Category": "/Home & Garden/Lights & Lighting/Light Bulbs"
  },
  {
    "CriterionID": 12822,
    "Category": "/Home & Garden/Lights & Lighting/Light Bulbs/Energy Efficient Light Bulbs"
  },
  {
    "CriterionID": 13139,
    "Category": "/Home & Garden/Lights & Lighting/Night Lights"
  },
  {
    "CriterionID": 10399,
    "Category": "/Home & Garden/Residential Cleaning"
  },
  {
    "CriterionID": 11523,
    "Category": "/Home & Garden/Residential Cleaning/House Cleaning Services"
  },
  {
    "CriterionID": 11524,
    "Category": "/Home & Garden/Residential Cleaning/Rug & Carpet Cleaning"
  },
  {
    "CriterionID": 11522,
    "Category": "/Home & Garden/Residential Cleaning/Upholstery Cleaning"
  },
  {
    "CriterionID": 11525,
    "Category": "/Home & Garden/Residential Cleaning/Window Covering Cleaning"
  },
  {
    "CriterionID": 10400,
    "Category": "/Home & Garden/Watch & Clock Repair"
  },
  {
    "CriterionID": 10407,
    "Category": "/Home & Garden/Water Filters"
  },
  {
    "CriterionID": 10406,
    "Category": "/Home & Garden/Yard, Garden & Patio"
  },
  {
    "CriterionID": 11537,
    "Category": "/Home & Garden/Yard, Garden & Patio/Fencing"
  },
  {
    "CriterionID": 13408,
    "Category": "/Home & Garden/Yard, Garden & Patio/Mailboxes"
  },
  {
    "CriterionID": 11541,
    "Category": "/Home & Garden/Yard, Garden & Patio/Outdoor Cooking Equipment & Accessories"
  },
  {
    "CriterionID": 12775,
    "Category": "/Home & Garden/Yard, Garden & Patio/Outdoor Cooking Equipment & Accessories/BBQs & Grills"
  },
  {
    "CriterionID": 13250,
    "Category": "/Home & Garden/Yard, Garden & Patio/Pest & Weed Control"
  },
  {
    "CriterionID": 11546,
    "Category": "/Home & Garden/Yard, Garden & Patio/Retaining Walls"
  },
  {
    "CriterionID": 11538,
    "Category": "/Home & Garden/Yard, Garden & Patio/Swimming Pools & Spas"
  },
  {
    "CriterionID": 11543,
    "Category": "/Home & Garden/Yard, Garden & Patio/Yard & Garden Equipment & Supplies"
  },
  {
    "CriterionID": 12588,
    "Category": "/Home & Garden/Yard, Garden & Patio/Yard & Garden Equipment & Supplies/Lawn Mowers & Grass Cutting Equipment"
  },
  {
    "CriterionID": 12778,
    "Category": "/Home & Garden/Yard, Garden & Patio/Yard & Garden Equipment & Supplies/Leaf Blowers & Lawn Vacuums"
  },
  {
    "CriterionID": 11540,
    "Category": "/Home & Garden/Yard, Garden & Patio/Yard & Patio Furniture & Accessories"
  },
  {
    "CriterionID": 12774,
    "Category": "/Home & Garden/Yard, Garden & Patio/Yard & Patio Furniture & Accessories/Picnic Tables & Benches"
  },
  {
    "CriterionID": 10007,
    "Category": "/Internet & Telecom"
  },
  {
    "CriterionID": 13420,
    "Category": "/Internet & Telecom/Cable Services"
  },
  {
    "CriterionID": 12766,
    "Category": "/Internet & Telecom/Cable Services/Cable TV"
  },
  {
    "CriterionID": 11509,
    "Category": "/Internet & Telecom/Calling Cards"
  },
  {
    "CriterionID": 13418,
    "Category": "/Internet & Telecom/Internet"
  },
  {
    "CriterionID": 11494,
    "Category": "/Internet & Telecom/Internet/Blogging Resources & Services"
  },
  {
    "CriterionID": 13821,
    "Category": "/Internet & Telecom/Internet/Blogging Resources & Services/Blogging Layouts & Templates"
  },
  {
    "CriterionID": 12757,
    "Category": "/Internet & Telecom/Internet/Blogging Resources & Services/RSS Feeds & Aggregators"
  },
  {
    "CriterionID": 11495,
    "Category": "/Internet & Telecom/Internet/Directories & Listings"
  },
  {
    "CriterionID": 13449,
    "Category": "/Internet & Telecom/Internet/Directories & Listings/Phone & Address Directories"
  },
  {
    "CriterionID": 13768,
    "Category": "/Internet & Telecom/Internet/Domain Names & Domain Name Registration"
  },
  {
    "CriterionID": 13094,
    "Category": "/Internet & Telecom/Internet/Email & Messaging"
  },
  {
    "CriterionID": 13598,
    "Category": "/Internet & Telecom/Internet/Email & Messaging/Contact Management"
  },
  {
    "CriterionID": 11502,
    "Category": "/Internet & Telecom/Internet/File Sharing & Hosting"
  },
  {
    "CriterionID": 10594,
    "Category": "/Internet & Telecom/Internet/File Sharing & Hosting/Music Sharing"
  },
  {
    "CriterionID": 12759,
    "Category": "/Internet & Telecom/Internet/File Sharing & Hosting/Peer-to-Peer File Sharing"
  },
  {
    "CriterionID": 12760,
    "Category": "/Internet & Telecom/Internet/File Sharing & Hosting/Single Host File Sharing"
  },
  {
    "CriterionID": 11499,
    "Category": "/Internet & Telecom/Internet/Forum & Chat Services"
  },
  {
    "CriterionID": 11491,
    "Category": "/Internet & Telecom/Internet/Internet Service Plans"
  },
  {
    "CriterionID": 12756,
    "Category": "/Internet & Telecom/Internet/Internet Service Plans/Cable Internet"
  },
  {
    "CriterionID": 12755,
    "Category": "/Internet & Telecom/Internet/Internet Service Plans/DSL & Fiber Optic Internet Service Plans"
  },
  {
    "CriterionID": 13769,
    "Category": "/Internet & Telecom/Internet/Internet Service Plans/Mobile Broadband"
  },
  {
    "CriterionID": 12754,
    "Category": "/Internet & Telecom/Internet/Internet Service Plans/Satellite Internet"
  },
  {
    "CriterionID": 13088,
    "Category": "/Internet & Telecom/Internet/Network Security"
  },
  {
    "CriterionID": 11503,
    "Category": "/Internet & Telecom/Internet/Online Auctioning Services"
  },
  {
    "CriterionID": 11500,
    "Category": "/Internet & Telecom/Internet/Online Maps"
  },
  {
    "CriterionID": 11492,
    "Category": "/Internet & Telecom/Internet/Online Photo & Video Sharing"
  },
  {
    "CriterionID": 13872,
    "Category": "/Internet & Telecom/Internet/Online Photo & Video Sharing/Photo & Image Sharing"
  },
  {
    "CriterionID": 13873,
    "Category": "/Internet & Telecom/Internet/Online Photo & Video Sharing/Video Sharing"
  },
  {
    "CriterionID": 11498,
    "Category": "/Internet & Telecom/Internet/Search Engines"
  },
  {
    "CriterionID": 13710,
    "Category": "/Internet & Telecom/Internet/Search Engines/People Search"
  },
  {
    "CriterionID": 11496,
    "Category": "/Internet & Telecom/Internet/Social Networks & Online Communities"
  },
  {
    "CriterionID": 13859,
    "Category": "/Internet & Telecom/Internet/Social Networks & Online Communities/Mobile Social Networks"
  },
  {
    "CriterionID": 13800,
    "Category": "/Internet & Telecom/Internet/Social Networks & Online Communities/Online Swap Communities"
  },
  {
    "CriterionID": 13577,
    "Category": "/Internet & Telecom/Internet/Social Networks & Online Communities/Virtual Worlds"
  },
  {
    "CriterionID": 11493,
    "Category": "/Internet & Telecom/Internet/Web Design & Development"
  },
  {
    "CriterionID": 11504,
    "Category": "/Internet & Telecom/Internet/Web Hosting"
  },
  {
    "CriterionID": 13725,
    "Category": "/Internet & Telecom/Internet/Web Portals"
  },
  {
    "CriterionID": 13421,
    "Category": "/Internet & Telecom/Satellite Services"
  },
  {
    "CriterionID": 12767,
    "Category": "/Internet & Telecom/Satellite Services/Satellite TV"
  },
  {
    "CriterionID": 11507,
    "Category": "/Internet & Telecom/Teleconferencing"
  },
  {
    "CriterionID": 13662,
    "Category": "/Internet & Telecom/Telegrams"
  },
  {
    "CriterionID": 10878,
    "Category": "/Internet & Telecom/Telephony"
  },
  {
    "CriterionID": 12169,
    "Category": "/Internet & Telecom/Telephony/Answering Machines"
  },
  {
    "CriterionID": 12171,
    "Category": "/Internet & Telecom/Telephony/Landline Phones & Accessories"
  },
  {
    "CriterionID": 12129,
    "Category": "/Internet & Telecom/Telephony/Landline Phones & Accessories/Landline Phone Accessories"
  },
  {
    "CriterionID": 13381,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories"
  },
  {
    "CriterionID": 13378,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Apps & Add-Ons"
  },
  {
    "CriterionID": 13380,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Apps & Add-Ons/Mobile Phone Games"
  },
  {
    "CriterionID": 13379,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Apps & Add-Ons/Ringtones & Ringtone Makers"
  },
  {
    "CriterionID": 12133,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phone Accessories"
  },
  {
    "CriterionID": 13032,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phone Accessories/Headsets"
  },
  {
    "CriterionID": 13031,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phone Accessories/Phone & SIM Cards"
  },
  {
    "CriterionID": 12161,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phones"
  },
  {
    "CriterionID": 13055,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phones/Camera Phones"
  },
  {
    "CriterionID": 13054,
    "Category": "/Internet & Telecom/Telephony/Mobile Phones & Accessories/Mobile Phones/Smart Phones"
  },
  {
    "CriterionID": 13419,
    "Category": "/Internet & Telecom/Telephony/Phone Plans"
  },
  {
    "CriterionID": 11510,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Landline Phone Plans"
  },
  {
    "CriterionID": 12762,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Landline Phone Plans/Long Distance Calling Plans"
  },
  {
    "CriterionID": 11511,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Mobile Phone Plans"
  },
  {
    "CriterionID": 12765,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Mobile Phone Plans/Mobile Phone Service Add-Ons"
  },
  {
    "CriterionID": 13759,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Mobile Phone Plans/Mobile Phone Service Add-Ons/Text Messaging"
  },
  {
    "CriterionID": 12764,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Mobile Phone Plans/Monthly Mobile Phone Service Plans"
  },
  {
    "CriterionID": 12763,
    "Category": "/Internet & Telecom/Telephony/Phone Plans/Mobile Phone Plans/Pre-Paid Mobile Phone Service Plans"
  },
  {
    "CriterionID": 11505,
    "Category": "/Internet & Telecom/Telephony/Phone Rental Services"
  },
  {
    "CriterionID": 12155,
    "Category": "/Internet & Telecom/Telephony/Telephone Maintenance"
  },
  {
    "CriterionID": 11508,
    "Category": "/Internet & Telecom/Telephony/Telephony Equipment Donation"
  },
  {
    "CriterionID": 13415,
    "Category": "/Internet & Telecom/Telephony/Voicemail Services & Calling Features"
  },
  {
    "CriterionID": 11506,
    "Category": "/Internet & Telecom/VOIP"
  },
  {
    "CriterionID": 12168,
    "Category": "/Internet & Telecom/VOIP/VOIP Telephones"
  },
  {
    "CriterionID": 10016,
    "Category": "/Jobs & Education"
  },
  {
    "CriterionID": 10140,
    "Category": "/Jobs & Education/Alumni & Classmate Resources"
  },
  {
    "CriterionID": 10141,
    "Category": "/Jobs & Education/Education & Training"
  },
  {
    "CriterionID": 13828,
    "Category": "/Jobs & Education/Education & Training/Academic Conferences & Publications"
  },
  {
    "CriterionID": 10760,
    "Category": "/Jobs & Education/Education & Training/CPR Training & Certification"
  },
  {
    "CriterionID": 10763,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education"
  },
  {
    "CriterionID": 13513,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Graduate Programs"
  },
  {
    "CriterionID": 12058,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Graduate Programs/Law Schools"
  },
  {
    "CriterionID": 12059,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Graduate Programs/MBA Programs"
  },
  {
    "CriterionID": 12057,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Graduate Programs/MFA Programs"
  },
  {
    "CriterionID": 11777,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Graduate Programs/Medical Schools"
  },
  {
    "CriterionID": 13514,
    "Category": "/Jobs & Education/Education & Training/Colleges, Universities & Post-Secondary Education/Undergraduate Programs"
  },
  {
    "CriterionID": 10766,
    "Category": "/Jobs & Education/Education & Training/Community & Continuing Education"
  },
  {
    "CriterionID": 10757,
    "Category": "/Jobs & Education/Education & Training/Language Education"
  },
  {
    "CriterionID": 13020,
    "Category": "/Jobs & Education/Education & Training/Language Education/Foreign Language Certifications"
  },
  {
    "CriterionID": 10752,
    "Category": "/Jobs & Education/Education & Training/Online Education & Degree Programs"
  },
  {
    "CriterionID": 10753,
    "Category": "/Jobs & Education/Education & Training/Preschool & Nursery School Programs"
  },
  {
    "CriterionID": 11029,
    "Category": "/Jobs & Education/Education & Training/Primary & Secondary Schooling (K-12)"
  },
  {
    "CriterionID": 12337,
    "Category": "/Jobs & Education/Education & Training/Primary & Secondary Schooling (K-12)/Homeschooling"
  },
  {
    "CriterionID": 13849,
    "Category": "/Jobs & Education/Education & Training/Public Speaking Resources"
  },
  {
    "CriterionID": 13438,
    "Category": "/Jobs & Education/Education & Training/Special Education"
  },
  {
    "CriterionID": 10754,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests"
  },
  {
    "CriterionID": 12039,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests/GED Preparation"
  },
  {
    "CriterionID": 12041,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests/GMAT Preparation"
  },
  {
    "CriterionID": 12040,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests/GRE Preparation"
  },
  {
    "CriterionID": 12042,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests/LSAT Preparation"
  },
  {
    "CriterionID": 12038,
    "Category": "/Jobs & Education/Education & Training/Standardized & Admissions Tests/SAT & College Boards Preparation"
  },
  {
    "CriterionID": 10762,
    "Category": "/Jobs & Education/Education & Training/Study Abroad Programs"
  },
  {
    "CriterionID": 10767,
    "Category": "/Jobs & Education/Education & Training/Teaching & Classroom Resources"
  },
  {
    "CriterionID": 12063,
    "Category": "/Jobs & Education/Education & Training/Teaching & Classroom Resources/Lesson Plans"
  },
  {
    "CriterionID": 12064,
    "Category": "/Jobs & Education/Education & Training/Teaching & Classroom Resources/School & Classroom Equipment"
  },
  {
    "CriterionID": 11871,
    "Category": "/Jobs & Education/Education & Training/Textbooks"
  },
  {
    "CriterionID": 10758,
    "Category": "/Jobs & Education/Education & Training/Training & Certification"
  },
  {
    "CriterionID": 12049,
    "Category": "/Jobs & Education/Education & Training/Training & Certification/Fitness Instruction Training"
  },
  {
    "CriterionID": 12046,
    "Category": "/Jobs & Education/Education & Training/Training & Certification/Real Estate Licensing"
  },
  {
    "CriterionID": 12047,
    "Category": "/Jobs & Education/Education & Training/Training & Certification/TEFL Training"
  },
  {
    "CriterionID": 12048,
    "Category": "/Jobs & Education/Education & Training/Training & Certification/Teacher Training & Certification"
  },
  {
    "CriterionID": 10761,
    "Category": "/Jobs & Education/Education & Training/Tutoring Services"
  },
  {
    "CriterionID": 10759,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools"
  },
  {
    "CriterionID": 12056,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Acting Schools & Programs"
  },
  {
    "CriterionID": 12050,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Arts Education"
  },
  {
    "CriterionID": 12055,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Bartending Schools & Programs"
  },
  {
    "CriterionID": 12198,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Computer Education"
  },
  {
    "CriterionID": 13783,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Cosmetology & Beauty Professional Education"
  },
  {
    "CriterionID": 12051,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Film Schools & Programs"
  },
  {
    "CriterionID": 12053,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Nursing Education"
  },
  {
    "CriterionID": 12054,
    "Category": "/Jobs & Education/Education & Training/Vocational Training & Trade Schools/Truck Driving Schools & Programs"
  },
  {
    "CriterionID": 10755,
    "Category": "/Jobs & Education/Education & Training/Writing Courses & Resources"
  },
  {
    "CriterionID": 12044,
    "Category": "/Jobs & Education/Education & Training/Writing Courses & Resources/Business & Technical Writing Courses & Resources"
  },
  {
    "CriterionID": 12043,
    "Category": "/Jobs & Education/Education & Training/Writing Courses & Resources/Creative Writing Courses & Resources"
  },
  {
    "CriterionID": 10139,
    "Category": "/Jobs & Education/Jobs & Careers"
  },
  {
    "CriterionID": 10744,
    "Category": "/Jobs & Education/Jobs & Careers/Career Assessments"
  },
  {
    "CriterionID": 10747,
    "Category": "/Jobs & Education/Jobs & Careers/Career Counseling & Coaching"
  },
  {
    "CriterionID": 13696,
    "Category": "/Jobs & Education/Jobs & Careers/Career Counseling & Coaching/Business Etiquette"
  },
  {
    "CriterionID": 12037,
    "Category": "/Jobs & Education/Jobs & Careers/Career Counseling & Coaching/Job Interview Coaching Services"
  },
  {
    "CriterionID": 12036,
    "Category": "/Jobs & Education/Jobs & Careers/Career Counseling & Coaching/Personal & Career Development"
  },
  {
    "CriterionID": 10745,
    "Category": "/Jobs & Education/Jobs & Careers/Career Events"
  },
  {
    "CriterionID": 10746,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings"
  },
  {
    "CriterionID": 12033,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Clerical & Administrative Jobs"
  },
  {
    "CriterionID": 13772,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Education Jobs"
  },
  {
    "CriterionID": 12032,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Engineering Jobs"
  },
  {
    "CriterionID": 12020,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Finance Jobs"
  },
  {
    "CriterionID": 13869,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Food Service Jobs"
  },
  {
    "CriterionID": 12026,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Freelance & Contract Jobs"
  },
  {
    "CriterionID": 13773,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Government & Public Sector Jobs"
  },
  {
    "CriterionID": 12025,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Headhunters & Independent Recruiters"
  },
  {
    "CriterionID": 12035,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Health & Medical Jobs"
  },
  {
    "CriterionID": 12024,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Human Resources Jobs"
  },
  {
    "CriterionID": 12029,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/IT & Technical Jobs"
  },
  {
    "CriterionID": 13877,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Industrial & Manufacturing Jobs"
  },
  {
    "CriterionID": 12021,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/International Jobs"
  },
  {
    "CriterionID": 12034,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Legal Jobs"
  },
  {
    "CriterionID": 12031,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Media Jobs"
  },
  {
    "CriterionID": 13774,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Post-Docs & Post-Doctoral Research"
  },
  {
    "CriterionID": 12022,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Recent College Graduate Jobs"
  },
  {
    "CriterionID": 12028,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Retail Jobs"
  },
  {
    "CriterionID": 12030,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Sales & Marketing Jobs"
  },
  {
    "CriterionID": 12027,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Social Service & Social Work Jobs"
  },
  {
    "CriterionID": 12023,
    "Category": "/Jobs & Education/Jobs & Careers/Job Listings/Temporary Jobs"
  },
  {
    "CriterionID": 10749,
    "Category": "/Jobs & Education/Jobs & Careers/Professional & Trade Associations"
  },
  {
    "CriterionID": 10748,
    "Category": "/Jobs & Education/Jobs & Careers/Professional Networking Resources"
  },
  {
    "CriterionID": 10743,
    "Category": "/Jobs & Education/Jobs & Careers/Resume Writing"
  },
  {
    "CriterionID": 12018,
    "Category": "/Jobs & Education/Jobs & Careers/Resume Writing/Resume & Cover Letter Samples & Templates"
  },
  {
    "CriterionID": 10018,
    "Category": "/Law & Government"
  },
  {
    "CriterionID": 13661,
    "Category": "/Law & Government/Census Services"
  },
  {
    "CriterionID": 10158,
    "Category": "/Law & Government/Emergency Services"
  },
  {
    "CriterionID": 10810,
    "Category": "/Law & Government/Emergency Services/Emergency Alert Services"
  },
  {
    "CriterionID": 10813,
    "Category": "/Law & Government/Emergency Services/Emergency Medical Services"
  },
  {
    "CriterionID": 10816,
    "Category": "/Law & Government/Emergency Services/Emergency Training Services"
  },
  {
    "CriterionID": 10815,
    "Category": "/Law & Government/Emergency Services/Fire Fighting Services"
  },
  {
    "CriterionID": 12107,
    "Category": "/Law & Government/Emergency Services/Fire Fighting Services/Forestry Fire Fighting Services"
  },
  {
    "CriterionID": 10817,
    "Category": "/Law & Government/Emergency Services/Poison Control"
  },
  {
    "CriterionID": 10811,
    "Category": "/Law & Government/Emergency Services/Roadside Assistance & Emergency Road Services"
  },
  {
    "CriterionID": 12104,
    "Category": "/Law & Government/Emergency Services/Roadside Assistance & Emergency Road Services/Auto Towing"
  },
  {
    "CriterionID": 10814,
    "Category": "/Law & Government/Emergency Services/Search & Rescue Services"
  },
  {
    "CriterionID": 13414,
    "Category": "/Law & Government/Government"
  },
  {
    "CriterionID": 13875,
    "Category": "/Law & Government/Government/Embassies & Consulates"
  },
  {
    "CriterionID": 13508,
    "Category": "/Law & Government/Government/Government Ministries"
  },
  {
    "CriterionID": 13444,
    "Category": "/Law & Government/Government/Royalty"
  },
  {
    "CriterionID": 13876,
    "Category": "/Law & Government/Government/State & Local Government"
  },
  {
    "CriterionID": 13343,
    "Category": "/Law & Government/Government Consulting & Contracting"
  },
  {
    "CriterionID": 10162,
    "Category": "/Law & Government/Law Enforcement & Protective Services"
  },
  {
    "CriterionID": 10849,
    "Category": "/Law & Government/Law Enforcement & Protective Services/Airport Security"
  },
  {
    "CriterionID": 10851,
    "Category": "/Law & Government/Law Enforcement & Protective Services/Police"
  },
  {
    "CriterionID": 10165,
    "Category": "/Law & Government/Law Enforcement & Protective Services/Private Investigation"
  },
  {
    "CriterionID": 10850,
    "Category": "/Law & Government/Law Enforcement & Protective Services/Traffic Safety"
  },
  {
    "CriterionID": 10163,
    "Category": "/Law & Government/Legal"
  },
  {
    "CriterionID": 10866,
    "Category": "/Law & Government/Legal/Accident & Personal Injury Law"
  },
  {
    "CriterionID": 13686,
    "Category": "/Law & Government/Legal/Attorneys & Law Firms"
  },
  {
    "CriterionID": 10864,
    "Category": "/Law & Government/Legal/Bail Bonds"
  },
  {
    "CriterionID": 10869,
    "Category": "/Law & Government/Legal/Bankruptcy Law"
  },
  {
    "CriterionID": 10862,
    "Category": "/Law & Government/Legal/Business & Corporate Law"
  },
  {
    "CriterionID": 10852,
    "Category": "/Law & Government/Legal/Class Action Law"
  },
  {
    "CriterionID": 10858,
    "Category": "/Law & Government/Legal/Court Reporting"
  },
  {
    "CriterionID": 13736,
    "Category": "/Law & Government/Legal/Criminal Law"
  },
  {
    "CriterionID": 10861,
    "Category": "/Law & Government/Legal/Criminal Law/Federal Crime Law"
  },
  {
    "CriterionID": 12126,
    "Category": "/Law & Government/Legal/Criminal Law/Federal Crime Law/Drug Crime Law"
  },
  {
    "CriterionID": 12125,
    "Category": "/Law & Government/Legal/Criminal Law/Federal Crime Law/White Collar Crime Law"
  },
  {
    "CriterionID": 10868,
    "Category": "/Law & Government/Legal/Family Law"
  },
  {
    "CriterionID": 12128,
    "Category": "/Law & Government/Legal/Family Law/Child Custody"
  },
  {
    "CriterionID": 12127,
    "Category": "/Law & Government/Legal/Family Law/Divorce Law"
  },
  {
    "CriterionID": 10860,
    "Category": "/Law & Government/Legal/Finance Law"
  },
  {
    "CriterionID": 10857,
    "Category": "/Law & Government/Legal/Immigration Law"
  },
  {
    "CriterionID": 12124,
    "Category": "/Law & Government/Legal/Immigration Law/Green Card Lottery"
  },
  {
    "CriterionID": 12123,
    "Category": "/Law & Government/Legal/Immigration Law/Work Permits & Work Visas"
  },
  {
    "CriterionID": 10871,
    "Category": "/Law & Government/Legal/Intellectual Property"
  },
  {
    "CriterionID": 10856,
    "Category": "/Law & Government/Legal/Labor & Employment Law"
  },
  {
    "CriterionID": 12122,
    "Category": "/Law & Government/Legal/Labor & Employment Law/Disability Rights"
  },
  {
    "CriterionID": 12121,
    "Category": "/Law & Government/Legal/Labor & Employment Law/Discrimination Law"
  },
  {
    "CriterionID": 12120,
    "Category": "/Law & Government/Legal/Labor & Employment Law/Sexual Harrassment"
  },
  {
    "CriterionID": 10867,
    "Category": "/Law & Government/Legal/Lawsuit Funding"
  },
  {
    "CriterionID": 10859,
    "Category": "/Law & Government/Legal/Legal Aid"
  },
  {
    "CriterionID": 10161,
    "Category": "/Law & Government/Legal/Legal Forms & Kits"
  },
  {
    "CriterionID": 10842,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Business Formation & Incorporation Documents"
  },
  {
    "CriterionID": 10848,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Confidentiality Forms"
  },
  {
    "CriterionID": 10838,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Deeds"
  },
  {
    "CriterionID": 10834,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Employment Agreement Contracts"
  },
  {
    "CriterionID": 10846,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Employment Offer Letters"
  },
  {
    "CriterionID": 10841,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Franchise Contracts"
  },
  {
    "CriterionID": 10840,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Health Directives"
  },
  {
    "CriterionID": 10835,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Name Changes"
  },
  {
    "CriterionID": 10845,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Notary Bonds"
  },
  {
    "CriterionID": 10831,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Patent Forms"
  },
  {
    "CriterionID": 10844,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Power of Attorney Forms"
  },
  {
    "CriterionID": 10833,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Prenuptial Agreements"
  },
  {
    "CriterionID": 10836,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Promissory Notes"
  },
  {
    "CriterionID": 10830,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms"
  },
  {
    "CriterionID": 12116,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms/Leases & Lease Amendments"
  },
  {
    "CriterionID": 13025,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms/Leases & Lease Amendments/Commercial Lease Contracts"
  },
  {
    "CriterionID": 13026,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms/Leases & Lease Amendments/Lease Amendments"
  },
  {
    "CriterionID": 13027,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms/Leases & Lease Amendments/Residential Lease Forms"
  },
  {
    "CriterionID": 12115,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Real Estate Rental & Leasing Forms/Rental Applications"
  },
  {
    "CriterionID": 10839,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Release Agreement Forms"
  },
  {
    "CriterionID": 10837,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Sales Agreements"
  },
  {
    "CriterionID": 10847,
    "Category": "/Law & Government/Legal/Legal Forms & Kits/Wills & Living Trusts"
  },
  {
    "CriterionID": 10865,
    "Category": "/Law & Government/Legal/Legal Insurance"
  },
  {
    "CriterionID": 13644,
    "Category": "/Law & Government/Legal/Lemon Laws"
  },
  {
    "CriterionID": 10855,
    "Category": "/Law & Government/Legal/Malpractice Suits & Law"
  },
  {
    "CriterionID": 10863,
    "Category": "/Law & Government/Legal/Military Legal Services"
  },
  {
    "CriterionID": 10853,
    "Category": "/Law & Government/Legal/Real Estate Law"
  },
  {
    "CriterionID": 13646,
    "Category": "/Law & Government/Legal/Vehicle Codes & Driving Laws"
  },
  {
    "CriterionID": 10870,
    "Category": "/Law & Government/Legal/Vehicle Codes & Driving Laws/Auto Accidents & Tickets"
  },
  {
    "CriterionID": 10854,
    "Category": "/Law & Government/Legal/Vehicle Codes & Driving Laws/DUI"
  },
  {
    "CriterionID": 10157,
    "Category": "/Law & Government/Legal/Vehicle Codes & Driving Laws/Vehicle Inspections"
  },
  {
    "CriterionID": 10199,
    "Category": "/Law & Government/Legal/Vehicle Codes & Driving Laws/Vehicle Registration"
  },
  {
    "CriterionID": 10159,
    "Category": "/Law & Government/Military"
  },
  {
    "CriterionID": 10821,
    "Category": "/Law & Government/Military/Air Force"
  },
  {
    "CriterionID": 10818,
    "Category": "/Law & Government/Military/Army"
  },
  {
    "CriterionID": 10819,
    "Category": "/Law & Government/Military/Coast Guard"
  },
  {
    "CriterionID": 10822,
    "Category": "/Law & Government/Military/Marines"
  },
  {
    "CriterionID": 13345,
    "Category": "/Law & Government/Military/Military Education & Training"
  },
  {
    "CriterionID": 13350,
    "Category": "/Law & Government/Military/Military Support Services"
  },
  {
    "CriterionID": 10823,
    "Category": "/Law & Government/Military/National Guard"
  },
  {
    "CriterionID": 10820,
    "Category": "/Law & Government/Military/Navy"
  },
  {
    "CriterionID": 10156,
    "Category": "/Law & Government/Politics"
  },
  {
    "CriterionID": 10808,
    "Category": "/Law & Government/Politics/Campaigns & Elections"
  },
  {
    "CriterionID": 10805,
    "Category": "/Law & Government/Politics/Conservative Politics"
  },
  {
    "CriterionID": 10809,
    "Category": "/Law & Government/Politics/Liberal Politics"
  },
  {
    "CriterionID": 10806,
    "Category": "/Law & Government/Politics/Lobbying Services"
  },
  {
    "CriterionID": 10807,
    "Category": "/Law & Government/Politics/Political Activism"
  },
  {
    "CriterionID": 10160,
    "Category": "/Law & Government/Public Services"
  },
  {
    "CriterionID": 10825,
    "Category": "/Law & Government/Public Services/Animal Control"
  },
  {
    "CriterionID": 10826,
    "Category": "/Law & Government/Public Services/Public Broadcasting"
  },
  {
    "CriterionID": 13403,
    "Category": "/Law & Government/Public Services/Public Health"
  },
  {
    "CriterionID": 13756,
    "Category": "/Law & Government/Public Services/Public Health/Food Safety & Inspection"
  },
  {
    "CriterionID": 10827,
    "Category": "/Law & Government/Public Services/Public Housing"
  },
  {
    "CriterionID": 10828,
    "Category": "/Law & Government/Public Services/Public Notaries"
  },
  {
    "CriterionID": 10829,
    "Category": "/Law & Government/Public Services/Public Utilities"
  },
  {
    "CriterionID": 13512,
    "Category": "/Law & Government/Public Services/Public Utilities/Gas Utilities"
  },
  {
    "CriterionID": 12114,
    "Category": "/Law & Government/Public Services/Public Utilities/Power & Electricity Services"
  },
  {
    "CriterionID": 12111,
    "Category": "/Law & Government/Public Services/Public Utilities/Water Services"
  },
  {
    "CriterionID": 10108,
    "Category": "/News, Media & Publications"
  },
  {
    "CriterionID": 10586,
    "Category": "/News, Media & Publications/Apparel Media & Publications"
  },
  {
    "CriterionID": 11876,
    "Category": "/News, Media & Publications/Apparel Media & Publications/Apparel Trade Publications"
  },
  {
    "CriterionID": 11875,
    "Category": "/News, Media & Publications/Apparel Media & Publications/Fashion & Style Publications"
  },
  {
    "CriterionID": 10112,
    "Category": "/News, Media & Publications/Books & Literature"
  },
  {
    "CriterionID": 13801,
    "Category": "/News, Media & Publications/Books & Literature/Audio Books"
  },
  {
    "CriterionID": 10609,
    "Category": "/News, Media & Publications/Books & Literature/Book Retailers"
  },
  {
    "CriterionID": 10608,
    "Category": "/News, Media & Publications/Books & Literature/Book Reviews"
  },
  {
    "CriterionID": 13445,
    "Category": "/News, Media & Publications/Books & Literature/Children's Books"
  },
  {
    "CriterionID": 10611,
    "Category": "/News, Media & Publications/Books & Literature/E-Books"
  },
  {
    "CriterionID": 13660,
    "Category": "/News, Media & Publications/Books & Literature/Poetry"
  },
  {
    "CriterionID": 10584,
    "Category": "/News, Media & Publications/Celebrities & Entertainment News"
  },
  {
    "CriterionID": 10576,
    "Category": "/News, Media & Publications/Health Media & Publications"
  },
  {
    "CriterionID": 13700,
    "Category": "/News, Media & Publications/Local News, Media & Publications"
  },
  {
    "CriterionID": 11866,
    "Category": "/News, Media & Publications/Magazines & Magazine Subscriptions"
  },
  {
    "CriterionID": 10573,
    "Category": "/News, Media & Publications/Men's Interests Media & Publications"
  },
  {
    "CriterionID": 11868,
    "Category": "/News, Media & Publications/Men's Interests Media & Publications/Men's Interests Media & Publications - Mature"
  },
  {
    "CriterionID": 13647,
    "Category": "/News, Media & Publications/Newspapers"
  },
  {
    "CriterionID": 13691,
    "Category": "/News, Media & Publications/Online Media"
  },
  {
    "CriterionID": 13785,
    "Category": "/News, Media & Publications/Online Media/Flash-Based Entertainment"
  },
  {
    "CriterionID": 13692,
    "Category": "/News, Media & Publications/Online Media/Online Image Galleries"
  },
  {
    "CriterionID": 10568,
    "Category": "/News, Media & Publications/Online Media/Podcasts"
  },
  {
    "CriterionID": 10569,
    "Category": "/News, Media & Publications/Online Media/Webcasts"
  },
  {
    "CriterionID": 13648,
    "Category": "/News, Media & Publications/Political News & Media"
  },
  {
    "CriterionID": 11867,
    "Category": "/News, Media & Publications/Publishing"
  },
  {
    "CriterionID": 12972,
    "Category": "/News, Media & Publications/Publishing/E-Book Publishing"
  },
  {
    "CriterionID": 12973,
    "Category": "/News, Media & Publications/Publishing/Self-Publishing"
  },
  {
    "CriterionID": 10756,
    "Category": "/News, Media & Publications/Reference Materials & Resources"
  },
  {
    "CriterionID": 13429,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Dictionaries"
  },
  {
    "CriterionID": 13430,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Encyclopedias"
  },
  {
    "CriterionID": 13600,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Geographic Reference"
  },
  {
    "CriterionID": 13601,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Geographic Reference/Maps"
  },
  {
    "CriterionID": 13716,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Public Records"
  },
  {
    "CriterionID": 13861,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Quotations"
  },
  {
    "CriterionID": 13432,
    "Category": "/News, Media & Publications/Reference Materials & Resources/Translation"
  },
  {
    "CriterionID": 13777,
    "Category": "/News, Media & Publications/Teen Media & Publications"
  },
  {
    "CriterionID": 10023,
    "Category": "/News, Media & Publications/Vehicle Media & Publications"
  },
  {
    "CriterionID": 13426,
    "Category": "/News, Media & Publications/Weather"
  },
  {
    "CriterionID": 10581,
    "Category": "/News, Media & Publications/Women's Interests Media & Publications"
  },
  {
    "CriterionID": 13451,
    "Category": "/News, Media & Publications/World News & Media"
  },
  {
    "CriterionID": 10006,
    "Category": "/Occasions & Gifts"
  },
  {
    "CriterionID": 10364,
    "Category": "/Occasions & Gifts/Cards & Greetings"
  },
  {
    "CriterionID": 11448,
    "Category": "/Occasions & Gifts/Cards & Greetings/E-Cards"
  },
  {
    "CriterionID": 11443,
    "Category": "/Occasions & Gifts/Cards & Greetings/Photo Cards"
  },
  {
    "CriterionID": 10361,
    "Category": "/Occasions & Gifts/Cards & Greetings/Stationery & Stationery Sets"
  },
  {
    "CriterionID": 11436,
    "Category": "/Occasions & Gifts/Cards & Greetings/Stationery & Stationery Sets/Personalized Stationery"
  },
  {
    "CriterionID": 11437,
    "Category": "/Occasions & Gifts/Cards & Greetings/Stationery & Stationery Sets/Thank You Cards"
  },
  {
    "CriterionID": 10362,
    "Category": "/Occasions & Gifts/Flower Arrangements"
  },
  {
    "CriterionID": 10365,
    "Category": "/Occasions & Gifts/Gifts"
  },
  {
    "CriterionID": 13468,
    "Category": "/Occasions & Gifts/Gifts/Engraving & Jewelry Engraving"
  },
  {
    "CriterionID": 11461,
    "Category": "/Occasions & Gifts/Gifts/Gift Baskets"
  },
  {
    "CriterionID": 12966,
    "Category": "/Occasions & Gifts/Gifts/Gift Cards"
  },
  {
    "CriterionID": 13306,
    "Category": "/Occasions & Gifts/Gifts/Gift Cards/Movie Gift Cards & Gift Certificates"
  },
  {
    "CriterionID": 13305,
    "Category": "/Occasions & Gifts/Gifts/Gift Cards/Restaurant Gift Cards & Gift Certificates"
  },
  {
    "CriterionID": 10373,
    "Category": "/Occasions & Gifts/Gifts/Gift Delivery"
  },
  {
    "CriterionID": 11486,
    "Category": "/Occasions & Gifts/Gifts/Gift Delivery/Flower Delivery Services"
  },
  {
    "CriterionID": 10370,
    "Category": "/Occasions & Gifts/Gifts/Gift Registries"
  },
  {
    "CriterionID": 11479,
    "Category": "/Occasions & Gifts/Gifts/Gift Registries/Baby Shower Registry Services"
  },
  {
    "CriterionID": 10367,
    "Category": "/Occasions & Gifts/Gifts/Gift Wrap & Ribbons"
  },
  {
    "CriterionID": 10376,
    "Category": "/Occasions & Gifts/Gifts/Gift Wrap & Ribbons/Gift Wrapping Services"
  },
  {
    "CriterionID": 11465,
    "Category": "/Occasions & Gifts/Gifts/Gift Wrap & Ribbons/Ribbons & Bows"
  },
  {
    "CriterionID": 11464,
    "Category": "/Occasions & Gifts/Gifts/Gift Wrap & Ribbons/Wrapping Paper"
  },
  {
    "CriterionID": 11458,
    "Category": "/Occasions & Gifts/Gifts/Gourmet Food Gifts"
  },
  {
    "CriterionID": 12748,
    "Category": "/Occasions & Gifts/Gifts/Gourmet Food Gifts/Fruit Gifts"
  },
  {
    "CriterionID": 12747,
    "Category": "/Occasions & Gifts/Gifts/Gourmet Food Gifts/Gourmet Gift Baskets"
  },
  {
    "CriterionID": 13509,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events"
  },
  {
    "CriterionID": 13786,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Carnival & Mardi Gras"
  },
  {
    "CriterionID": 13738,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Christmas"
  },
  {
    "CriterionID": 13739,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Easter"
  },
  {
    "CriterionID": 13740,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Halloween & October 31st"
  },
  {
    "CriterionID": 10363,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Holiday & Seasonal Decorations"
  },
  {
    "CriterionID": 11441,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Holiday & Seasonal Decorations/Holiday Ornaments & Lights"
  },
  {
    "CriterionID": 11440,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Holiday & Seasonal Decorations/Holiday Trees & Plants"
  },
  {
    "CriterionID": 12737,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Holiday & Seasonal Decorations/Holiday Wreaths"
  },
  {
    "CriterionID": 11442,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Holiday & Seasonal Decorations/Holiday-Themed Housewares"
  },
  {
    "CriterionID": 13741,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Jewish Holidays"
  },
  {
    "CriterionID": 13507,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Mother's Day & Father's Day"
  },
  {
    "CriterionID": 13787,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/New Year's"
  },
  {
    "CriterionID": 13742,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Thanksgiving"
  },
  {
    "CriterionID": 13510,
    "Category": "/Occasions & Gifts/Holidays & Seasonal Events/Valentine's Day"
  },
  {
    "CriterionID": 10368,
    "Category": "/Occasions & Gifts/Parties & Party Supplies"
  },
  {
    "CriterionID": 11468,
    "Category": "/Occasions & Gifts/Parties & Party Supplies/Paper Plates, Napkins & Disposable Cutlery"
  },
  {
    "CriterionID": 11466,
    "Category": "/Occasions & Gifts/Parties & Party Supplies/Party Decorations"
  },
  {
    "CriterionID": 11467,
    "Category": "/Occasions & Gifts/Parties & Party Supplies/Party Favors"
  },
  {
    "CriterionID": 11469,
    "Category": "/Occasions & Gifts/Parties & Party Supplies/Party Invitations"
  },
  {
    "CriterionID": 10372,
    "Category": "/Occasions & Gifts/Singing Telegrams"
  },
  {
    "CriterionID": 13493,
    "Category": "/Occasions & Gifts/Special Occasions"
  },
  {
    "CriterionID": 13501,
    "Category": "/Occasions & Gifts/Special Occasions/Anniversaries"
  },
  {
    "CriterionID": 13503,
    "Category": "/Occasions & Gifts/Special Occasions/Baby Showers & New Baby"
  },
  {
    "CriterionID": 13502,
    "Category": "/Occasions & Gifts/Special Occasions/Birthdays & Name Days"
  },
  {
    "CriterionID": 10366,
    "Category": "/Occasions & Gifts/Special Occasions/Funerals & Bereavement"
  },
  {
    "CriterionID": 13793,
    "Category": "/Occasions & Gifts/Special Occasions/Funerals & Bereavement/Pet Loss & Sympathy"
  },
  {
    "CriterionID": 13506,
    "Category": "/Occasions & Gifts/Special Occasions/Get Well"
  },
  {
    "CriterionID": 13504,
    "Category": "/Occasions & Gifts/Special Occasions/Graduation"
  },
  {
    "CriterionID": 13505,
    "Category": "/Occasions & Gifts/Special Occasions/Religious Occasions"
  },
  {
    "CriterionID": 11483,
    "Category": "/Occasions & Gifts/Special Occasions/Wedding & Special Occasion Photo & Video"
  },
  {
    "CriterionID": 10369,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings"
  },
  {
    "CriterionID": 11480,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding & Party Planning"
  },
  {
    "CriterionID": 11471,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Albums & Scrapbooks"
  },
  {
    "CriterionID": 11482,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Beauty Services"
  },
  {
    "CriterionID": 11478,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Cards"
  },
  {
    "CriterionID": 11470,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Decorations"
  },
  {
    "CriterionID": 11473,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Favors"
  },
  {
    "CriterionID": 11476,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Flowers"
  },
  {
    "CriterionID": 12751,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Flowers/Wedding Bouquets"
  },
  {
    "CriterionID": 12753,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Flowers/Wedding Boutonnieres & Corsages"
  },
  {
    "CriterionID": 12752,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Flowers/Wedding Centerpieces"
  },
  {
    "CriterionID": 11474,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Gifts"
  },
  {
    "CriterionID": 11477,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Guestbooks"
  },
  {
    "CriterionID": 11475,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Invitations"
  },
  {
    "CriterionID": 11472,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Programs"
  },
  {
    "CriterionID": 11481,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Registries"
  },
  {
    "CriterionID": 11484,
    "Category": "/Occasions & Gifts/Special Occasions/Weddings/Wedding Supply & Equipment Rentals"
  },
  {
    "CriterionID": 10003,
    "Category": "/Real Estate"
  },
  {
    "CriterionID": 10043,
    "Category": "/Real Estate/Commercial & Investment Real Estate"
  },
  {
    "CriterionID": 10041,
    "Category": "/Real Estate/Escrow & Real Estate Titling"
  },
  {
    "CriterionID": 10260,
    "Category": "/Real Estate/Escrow & Real Estate Titling/Escrow Services"
  },
  {
    "CriterionID": 10259,
    "Category": "/Real Estate/Escrow & Real Estate Titling/Real Estate Titling & Land Registry"
  },
  {
    "CriterionID": 11040,
    "Category": "/Real Estate/Escrow & Real Estate Titling/Real Estate Titling & Land Registry/Property Title Searches"
  },
  {
    "CriterionID": 11039,
    "Category": "/Real Estate/Escrow & Real Estate Titling/Real Estate Titling & Land Registry/Title Insurance"
  },
  {
    "CriterionID": 10037,
    "Category": "/Real Estate/House Plans & Floor Plans"
  },
  {
    "CriterionID": 13784,
    "Category": "/Real Estate/Housing Market & Real Estate Prices"
  },
  {
    "CriterionID": 10036,
    "Category": "/Real Estate/Private Communities"
  },
  {
    "CriterionID": 10255,
    "Category": "/Real Estate/Private Communities/Golf Communities"
  },
  {
    "CriterionID": 10254,
    "Category": "/Real Estate/Private Communities/Shared Interest Living Communities"
  },
  {
    "CriterionID": 10039,
    "Category": "/Real Estate/Property Development"
  },
  {
    "CriterionID": 10257,
    "Category": "/Real Estate/Property Development/Commercial Property Development"
  },
  {
    "CriterionID": 10258,
    "Category": "/Real Estate/Property Development/New Homes & Custom Homes"
  },
  {
    "CriterionID": 10034,
    "Category": "/Real Estate/Property Inspections & Appraisals"
  },
  {
    "CriterionID": 10248,
    "Category": "/Real Estate/Property Inspections & Appraisals/Home Appraisals"
  },
  {
    "CriterionID": 10247,
    "Category": "/Real Estate/Property Inspections & Appraisals/Land Surveying"
  },
  {
    "CriterionID": 10033,
    "Category": "/Real Estate/Property Management"
  },
  {
    "CriterionID": 10040,
    "Category": "/Real Estate/Real Estate Agents & Brokerages"
  },
  {
    "CriterionID": 13649,
    "Category": "/Real Estate/Real Estate Auctions"
  },
  {
    "CriterionID": 10042,
    "Category": "/Real Estate/Real Estate Listings"
  },
  {
    "CriterionID": 13690,
    "Category": "/Real Estate/Real Estate Listings/Bank-Owned & Foreclosed Listings"
  },
  {
    "CriterionID": 10264,
    "Category": "/Real Estate/Real Estate Listings/Commercial Real Estate Listings"
  },
  {
    "CriterionID": 13688,
    "Category": "/Real Estate/Real Estate Listings/Condo & Co-op Listings"
  },
  {
    "CriterionID": 10267,
    "Category": "/Real Estate/Real Estate Listings/For Sale By Owner Listings"
  },
  {
    "CriterionID": 10265,
    "Category": "/Real Estate/Real Estate Listings/Government Assistance Home Listing Services"
  },
  {
    "CriterionID": 10266,
    "Category": "/Real Estate/Real Estate Listings/Land & Acreage Listings"
  },
  {
    "CriterionID": 13689,
    "Category": "/Real Estate/Real Estate Listings/Mobile & Manufactured Home Listings"
  },
  {
    "CriterionID": 10262,
    "Category": "/Real Estate/Real Estate Listings/Rent To Own Real Estate Listings"
  },
  {
    "CriterionID": 10032,
    "Category": "/Real Estate/Real Estate Listings/Rental Listings"
  },
  {
    "CriterionID": 13687,
    "Category": "/Real Estate/Real Estate Listings/Rental Listings/Apartment Rentals"
  },
  {
    "CriterionID": 10243,
    "Category": "/Real Estate/Real Estate Listings/Rental Listings/Furnished & Short-Term Rental Listings"
  },
  {
    "CriterionID": 10244,
    "Category": "/Real Estate/Real Estate Listings/Rental Listings/Roommates & Flat Sharing"
  },
  {
    "CriterionID": 10261,
    "Category": "/Real Estate/Real Estate Listings/Senior Living Listings"
  },
  {
    "CriterionID": 10035,
    "Category": "/Real Estate/Relocation & Household Moving"
  },
  {
    "CriterionID": 10253,
    "Category": "/Real Estate/Relocation & Household Moving/Consumer Vehicle Shipping Services"
  },
  {
    "CriterionID": 10251,
    "Category": "/Real Estate/Relocation & Household Moving/Moving Supplies"
  },
  {
    "CriterionID": 10250,
    "Category": "/Real Estate/Relocation & Household Moving/Moving Truck & Van Rental"
  },
  {
    "CriterionID": 10252,
    "Category": "/Real Estate/Relocation & Household Moving/Storage Rental Services"
  },
  {
    "CriterionID": 10249,
    "Category": "/Real Estate/Relocation & Household Moving/Temporary Housing Services"
  },
  {
    "CriterionID": 10038,
    "Category": "/Real Estate/Vacation Properties & Second Homes"
  },
  {
    "CriterionID": 10256,
    "Category": "/Real Estate/Vacation Properties & Second Homes/Timeshares"
  },
  {
    "CriterionID": 13575,
    "Category": "/Retailers & General Merchandise"
  },
  {
    "CriterionID": 13441,
    "Category": "/Retailers & General Merchandise/Coupons & Rebates"
  },
  {
    "CriterionID": 13810,
    "Category": "/Retailers & General Merchandise/Informal Selling & Exchanging"
  },
  {
    "CriterionID": 13811,
    "Category": "/Retailers & General Merchandise/Informal Selling & Exchanging/Garage, Estate & Yard Sales"
  },
  {
    "CriterionID": 13842,
    "Category": "/Retailers & General Merchandise/Rental Services"
  },
  {
    "CriterionID": 13860,
    "Category": "/Retailers & General Merchandise/Shopping Portals & Search Engines"
  },
  {
    "CriterionID": 13719,
    "Category": "/Retailers & General Merchandise/Wholesalers & Liquidators"
  },
  {
    "CriterionID": 10014,
    "Category": "/Sports & Fitness"
  },
  {
    "CriterionID": 10117,
    "Category": "/Sports & Fitness/Boating & Water Recreation"
  },
  {
    "CriterionID": 10627,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories"
  },
  {
    "CriterionID": 11905,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories/Boat & Watercraft Safety Accessories"
  },
  {
    "CriterionID": 12981,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories/Boat Gauges, Clocks & Instruments"
  },
  {
    "CriterionID": 11906,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories/Boat Propellers"
  },
  {
    "CriterionID": 11903,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories/Boat Seats"
  },
  {
    "CriterionID": 11904,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Boat & Watercraft Parts & Accessories/Marine Engines & Parts"
  },
  {
    "CriterionID": 10628,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Fishing"
  },
  {
    "CriterionID": 11907,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Fishing/Fishing Tackle"
  },
  {
    "CriterionID": 12980,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Fishing/Fishing Tackle/Fishing Bait, Lures & Ties"
  },
  {
    "CriterionID": 12979,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Fishing/Fishing Tackle/Fishing Rods & Poles"
  },
  {
    "CriterionID": 10629,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Scuba & Diving"
  },
  {
    "CriterionID": 10626,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Surfing & Windsurfing Gear"
  },
  {
    "CriterionID": 10630,
    "Category": "/Sports & Fitness/Boating & Water Recreation/Water Skiing Equipment & Gear"
  },
  {
    "CriterionID": 10123,
    "Category": "/Sports & Fitness/Fitness"
  },
  {
    "CriterionID": 10666,
    "Category": "/Sports & Fitness/Fitness/Fitness Classes & Instruction"
  },
  {
    "CriterionID": 10667,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories"
  },
  {
    "CriterionID": 11925,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Exercise Mats"
  },
  {
    "CriterionID": 11928,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines"
  },
  {
    "CriterionID": 12983,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines/Eliptical Machines"
  },
  {
    "CriterionID": 12986,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines/Home Gyms & Weight Training Machines"
  },
  {
    "CriterionID": 12987,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines/Stair Machines"
  },
  {
    "CriterionID": 12984,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines/Stationary Bikes"
  },
  {
    "CriterionID": 12985,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness & Weight Training Machines/Treadmills"
  },
  {
    "CriterionID": 11926,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Fitness Balls"
  },
  {
    "CriterionID": 11927,
    "Category": "/Sports & Fitness/Fitness/Fitness Equipment & Accessories/Weight Training Accessories"
  },
  {
    "CriterionID": 10668,
    "Category": "/Sports & Fitness/Fitness/Gyms & Gym Memberships"
  },
  {
    "CriterionID": 10669,
    "Category": "/Sports & Fitness/Fitness/Personal Training"
  },
  {
    "CriterionID": 13486,
    "Category": "/Sports & Fitness/Fitness/Yoga & Pilates"
  },
  {
    "CriterionID": 10121,
    "Category": "/Sports & Fitness/Sporting Goods"
  },
  {
    "CriterionID": 10648,
    "Category": "/Sports & Fitness/Sporting Goods/Airsoft Equipment"
  },
  {
    "CriterionID": 10661,
    "Category": "/Sports & Fitness/Sporting Goods/American Football Equipment"
  },
  {
    "CriterionID": 10656,
    "Category": "/Sports & Fitness/Sporting Goods/Archery Equipment"
  },
  {
    "CriterionID": 11921,
    "Category": "/Sports & Fitness/Sporting Goods/Archery Equipment/Bow Hunting"
  },
  {
    "CriterionID": 10643,
    "Category": "/Sports & Fitness/Sporting Goods/Backyard Games Equipment"
  },
  {
    "CriterionID": 10644,
    "Category": "/Sports & Fitness/Sporting Goods/Baseball Equipment"
  },
  {
    "CriterionID": 10637,
    "Category": "/Sports & Fitness/Sporting Goods/Basketball Equipment"
  },
  {
    "CriterionID": 10645,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories"
  },
  {
    "CriterionID": 11915,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles"
  },
  {
    "CriterionID": 13892,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles/BMX Bikes"
  },
  {
    "CriterionID": 13893,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles/Cruiser Bikes"
  },
  {
    "CriterionID": 12996,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles/Kids' Bikes & Trikes"
  },
  {
    "CriterionID": 13895,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles/Mountain Bikes"
  },
  {
    "CriterionID": 13896,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bicycles/Road Bikes"
  },
  {
    "CriterionID": 13889,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bike Accessories"
  },
  {
    "CriterionID": 13890,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bike Frames"
  },
  {
    "CriterionID": 11916,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bike Helmets & Protective Gear"
  },
  {
    "CriterionID": 13891,
    "Category": "/Sports & Fitness/Sporting Goods/Bicycles & Accessories/Bike Parts & Repair"
  },
  {
    "CriterionID": 10647,
    "Category": "/Sports & Fitness/Sporting Goods/Bowling Equipment"
  },
  {
    "CriterionID": 13632,
    "Category": "/Sports & Fitness/Sporting Goods/Combat Sports Equipment"
  },
  {
    "CriterionID": 10650,
    "Category": "/Sports & Fitness/Sporting Goods/Combat Sports Equipment/Boxing Gloves & Gear"
  },
  {
    "CriterionID": 10654,
    "Category": "/Sports & Fitness/Sporting Goods/Combat Sports Equipment/Martial Arts Equipment"
  },
  {
    "CriterionID": 10662,
    "Category": "/Sports & Fitness/Sporting Goods/Combat Sports Equipment/Wrestling Equipment"
  },
  {
    "CriterionID": 10635,
    "Category": "/Sports & Fitness/Sporting Goods/Cricket Equipment"
  },
  {
    "CriterionID": 10664,
    "Category": "/Sports & Fitness/Sporting Goods/Equestrian Equipment & Tack"
  },
  {
    "CriterionID": 13571,
    "Category": "/Sports & Fitness/Sporting Goods/Extreme Sports Equipment"
  },
  {
    "CriterionID": 10653,
    "Category": "/Sports & Fitness/Sporting Goods/Golf Equipment"
  },
  {
    "CriterionID": 11919,
    "Category": "/Sports & Fitness/Sporting Goods/Golf Equipment/Golf Balls"
  },
  {
    "CriterionID": 11918,
    "Category": "/Sports & Fitness/Sporting Goods/Golf Equipment/Golf Clubs"
  },
  {
    "CriterionID": 11920,
    "Category": "/Sports & Fitness/Sporting Goods/Golf Equipment/Golf Tees"
  },
  {
    "CriterionID": 10660,
    "Category": "/Sports & Fitness/Sporting Goods/Gymnastics Equipment"
  },
  {
    "CriterionID": 10665,
    "Category": "/Sports & Fitness/Sporting Goods/Hockey & Roller Hockey Equipment"
  },
  {
    "CriterionID": 11923,
    "Category": "/Sports & Fitness/Sporting Goods/Hockey & Roller Hockey Equipment/Ice Hockey Skates"
  },
  {
    "CriterionID": 11924,
    "Category": "/Sports & Fitness/Sporting Goods/Hockey & Roller Hockey Equipment/Roller Hockey Skates"
  },
  {
    "CriterionID": 10641,
    "Category": "/Sports & Fitness/Sporting Goods/Hunting & Shooting Equipment"
  },
  {
    "CriterionID": 10633,
    "Category": "/Sports & Fitness/Sporting Goods/Ice Skating Equipment"
  },
  {
    "CriterionID": 11908,
    "Category": "/Sports & Fitness/Sporting Goods/Ice Skating Equipment/Ice Skates"
  },
  {
    "CriterionID": 12982,
    "Category": "/Sports & Fitness/Sporting Goods/Ice Skating Equipment/Ice Skates/Figure Skates"
  },
  {
    "CriterionID": 10646,
    "Category": "/Sports & Fitness/Sporting Goods/Lacrosse Equipment"
  },
  {
    "CriterionID": 10640,
    "Category": "/Sports & Fitness/Sporting Goods/Paintball Equipment"
  },
  {
    "CriterionID": 10636,
    "Category": "/Sports & Fitness/Sporting Goods/Roller Skating & Rollerblading Equipment"
  },
  {
    "CriterionID": 11914,
    "Category": "/Sports & Fitness/Sporting Goods/Roller Skating & Rollerblading Equipment/Inline Skates"
  },
  {
    "CriterionID": 10649,
    "Category": "/Sports & Fitness/Sporting Goods/Rugby Equipment"
  },
  {
    "CriterionID": 10657,
    "Category": "/Sports & Fitness/Sporting Goods/Running & Walking Equipment"
  },
  {
    "CriterionID": 10659,
    "Category": "/Sports & Fitness/Sporting Goods/Skateboarding Equipment"
  },
  {
    "CriterionID": 11922,
    "Category": "/Sports & Fitness/Sporting Goods/Skateboarding Equipment/Skateboards & Skateboard Components"
  },
  {
    "CriterionID": 10658,
    "Category": "/Sports & Fitness/Sporting Goods/Soccer Equipment"
  },
  {
    "CriterionID": 10638,
    "Category": "/Sports & Fitness/Sporting Goods/Sports Uniforms"
  },
  {
    "CriterionID": 10642,
    "Category": "/Sports & Fitness/Sporting Goods/Squash & Racquetball Equipment"
  },
  {
    "CriterionID": 10652,
    "Category": "/Sports & Fitness/Sporting Goods/Swimming & Aquatic Sports Equipment"
  },
  {
    "CriterionID": 10639,
    "Category": "/Sports & Fitness/Sporting Goods/Table Tennis Equipment"
  },
  {
    "CriterionID": 10651,
    "Category": "/Sports & Fitness/Sporting Goods/Tennis Equipment"
  },
  {
    "CriterionID": 10655,
    "Category": "/Sports & Fitness/Sporting Goods/Track & Field Equipment"
  },
  {
    "CriterionID": 10663,
    "Category": "/Sports & Fitness/Sporting Goods/Volleyball Equipment"
  },
  {
    "CriterionID": 10634,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment"
  },
  {
    "CriterionID": 13485,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment/Skiing Equipment"
  },
  {
    "CriterionID": 11912,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment/Skiing Equipment/Ski & Snowboard Helmets"
  },
  {
    "CriterionID": 11913,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment/Skiing Equipment/Skis"
  },
  {
    "CriterionID": 11909,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment/Snow Sleds"
  },
  {
    "CriterionID": 11910,
    "Category": "/Sports & Fitness/Sporting Goods/Winter Sports Equipment/Snowboarding Gear"
  },
  {
    "CriterionID": 13605,
    "Category": "/Sports & Fitness/Sports"
  },
  {
    "CriterionID": 13606,
    "Category": "/Sports & Fitness/Sports/American Football"
  },
  {
    "CriterionID": 13610,
    "Category": "/Sports & Fitness/Sports/Baseball"
  },
  {
    "CriterionID": 13609,
    "Category": "/Sports & Fitness/Sports/Basketball"
  },
  {
    "CriterionID": 13628,
    "Category": "/Sports & Fitness/Sports/Bowling"
  },
  {
    "CriterionID": 13839,
    "Category": "/Sports & Fitness/Sports/Cheerleading"
  },
  {
    "CriterionID": 13621,
    "Category": "/Sports & Fitness/Sports/College Sports"
  },
  {
    "CriterionID": 13633,
    "Category": "/Sports & Fitness/Sports/Combat Sports"
  },
  {
    "CriterionID": 13634,
    "Category": "/Sports & Fitness/Sports/Combat Sports/Boxing"
  },
  {
    "CriterionID": 13631,
    "Category": "/Sports & Fitness/Sports/Combat Sports/Martial Arts"
  },
  {
    "CriterionID": 13365,
    "Category": "/Sports & Fitness/Sports/Combat Sports/Martial Arts/Martial Arts Instruction"
  },
  {
    "CriterionID": 13874,
    "Category": "/Sports & Fitness/Sports/Combat Sports/Traditional Wrestling"
  },
  {
    "CriterionID": 13607,
    "Category": "/Sports & Fitness/Sports/Cricket"
  },
  {
    "CriterionID": 13615,
    "Category": "/Sports & Fitness/Sports/Cycling"
  },
  {
    "CriterionID": 13664,
    "Category": "/Sports & Fitness/Sports/Equestrian Sports"
  },
  {
    "CriterionID": 13623,
    "Category": "/Sports & Fitness/Sports/Extreme Sports"
  },
  {
    "CriterionID": 13627,
    "Category": "/Sports & Fitness/Sports/Golf"
  },
  {
    "CriterionID": 13629,
    "Category": "/Sports & Fitness/Sports/Gymnastics"
  },
  {
    "CriterionID": 13870,
    "Category": "/Sports & Fitness/Sports/Handball"
  },
  {
    "CriterionID": 13611,
    "Category": "/Sports & Fitness/Sports/Hockey"
  },
  {
    "CriterionID": 13612,
    "Category": "/Sports & Fitness/Sports/Hunting & Shooting"
  },
  {
    "CriterionID": 13624,
    "Category": "/Sports & Fitness/Sports/Motor Sports"
  },
  {
    "CriterionID": 13833,
    "Category": "/Sports & Fitness/Sports/Rodeo"
  },
  {
    "CriterionID": 13613,
    "Category": "/Sports & Fitness/Sports/Rugby"
  },
  {
    "CriterionID": 13616,
    "Category": "/Sports & Fitness/Sports/Running & Walking"
  },
  {
    "CriterionID": 13617,
    "Category": "/Sports & Fitness/Sports/Skate Sports"
  },
  {
    "CriterionID": 13608,
    "Category": "/Sports & Fitness/Sports/Soccer"
  },
  {
    "CriterionID": 13618,
    "Category": "/Sports & Fitness/Sports/Surfing & Windsurfing"
  },
  {
    "CriterionID": 13619,
    "Category": "/Sports & Fitness/Sports/Swimming & Aquatic Sports"
  },
  {
    "CriterionID": 13626,
    "Category": "/Sports & Fitness/Sports/Tennis"
  },
  {
    "CriterionID": 13871,
    "Category": "/Sports & Fitness/Sports/Track & Field"
  },
  {
    "CriterionID": 13630,
    "Category": "/Sports & Fitness/Sports/Volleyball"
  },
  {
    "CriterionID": 13620,
    "Category": "/Sports & Fitness/Sports/Winter Sports"
  },
  {
    "CriterionID": 13614,
    "Category": "/Sports & Fitness/Sports/Winter Sports/Ice Skating"
  },
  {
    "CriterionID": 13639,
    "Category": "/Sports & Fitness/Sports/Winter Sports/Skiing"
  },
  {
    "CriterionID": 11911,
    "Category": "/Sports & Fitness/Sports/Winter Sports/Skiing/Ski Lift Tickets"
  },
  {
    "CriterionID": 13640,
    "Category": "/Sports & Fitness/Sports/Winter Sports/Snowboarding"
  },
  {
    "CriterionID": 13625,
    "Category": "/Sports & Fitness/Sports/World Sports Events"
  },
  {
    "CriterionID": 13781,
    "Category": "/Sports & Fitness/Sports/World Sports Events/Olympics"
  },
  {
    "CriterionID": 10115,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel"
  },
  {
    "CriterionID": 10623,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Cycling Apparel"
  },
  {
    "CriterionID": 11900,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Cycling Apparel/Cycling Footwear"
  },
  {
    "CriterionID": 10624,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Gymnastics Apparel"
  },
  {
    "CriterionID": 10622,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Ice Skating Apparel"
  },
  {
    "CriterionID": 10621,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Running Apparel"
  },
  {
    "CriterionID": 10618,
    "Category": "/Sports & Fitness/Sports & Fitness Apparel/Winter Sports Apparel"
  },
  {
    "CriterionID": 10120,
    "Category": "/Sports & Fitness/Sports Equipment Rental Services"
  },
  {
    "CriterionID": 10632,
    "Category": "/Sports & Fitness/Sports Equipment Rental Services/Boat & Marine Vehicle Rental Services"
  },
  {
    "CriterionID": 10631,
    "Category": "/Sports & Fitness/Sports Equipment Rental Services/Ski & Winter Sports Equipment Rental Services"
  },
  {
    "CriterionID": 10116,
    "Category": "/Sports & Fitness/Sports Fan Gear & Apparel"
  },
  {
    "CriterionID": 11902,
    "Category": "/Sports & Fitness/Sports Fan Gear & Apparel/Sports Team Hats & Caps"
  },
  {
    "CriterionID": 11901,
    "Category": "/Sports & Fitness/Sports Fan Gear & Apparel/Sports Team Jerseys"
  },
  {
    "CriterionID": 10122,
    "Category": "/Sports & Fitness/Sports Instruction & Coaching"
  },
  {
    "CriterionID": 13483,
    "Category": "/Sports & Fitness/Sports Instruction & Coaching/Dance Classes & Lessons"
  },
  {
    "CriterionID": 13482,
    "Category": "/Sports & Fitness/Sports Instruction & Coaching/Gymnastics Lessons & Classes"
  },
  {
    "CriterionID": 13367,
    "Category": "/Sports & Fitness/Sports Instruction & Coaching/Horseback Riding Lessons"
  },
  {
    "CriterionID": 13366,
    "Category": "/Sports & Fitness/Sports Instruction & Coaching/Swim Lessons & Aquatic Fitness Instruction"
  },
  {
    "CriterionID": 10114,
    "Category": "/Sports & Fitness/Sports News & Media"
  },
  {
    "CriterionID": 10617,
    "Category": "/Sports & Fitness/Sports News & Media/Fitness Media & Publications"
  },
  {
    "CriterionID": 10119,
    "Category": "/Sports & Fitness/Sports Programs & Camps"
  },
  {
    "CriterionID": 10017,
    "Category": "/Travel & Tourism"
  },
  {
    "CriterionID": 10142,
    "Category": "/Travel & Tourism/Accommodations"
  },
  {
    "CriterionID": 10775,
    "Category": "/Travel & Tourism/Accommodations/Accommodation Packages"
  },
  {
    "CriterionID": 10772,
    "Category": "/Travel & Tourism/Accommodations/Bed & Breakfasts"
  },
  {
    "CriterionID": 10771,
    "Category": "/Travel & Tourism/Accommodations/Camping, Caravan & RV Accommodations"
  },
  {
    "CriterionID": 12070,
    "Category": "/Travel & Tourism/Accommodations/Camping, Caravan & RV Accommodations/Campsites & Campgrounds"
  },
  {
    "CriterionID": 12071,
    "Category": "/Travel & Tourism/Accommodations/Camping, Caravan & RV Accommodations/Caravan & RV Rentals"
  },
  {
    "CriterionID": 10768,
    "Category": "/Travel & Tourism/Accommodations/Hostel Accommodations"
  },
  {
    "CriterionID": 10769,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts"
  },
  {
    "CriterionID": 12068,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Extended Stay Hotels & Motels"
  },
  {
    "CriterionID": 12067,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Hotels"
  },
  {
    "CriterionID": 13022,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Hotels/Hotel Packages"
  },
  {
    "CriterionID": 12065,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Motels"
  },
  {
    "CriterionID": 12066,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Resorts"
  },
  {
    "CriterionID": 13021,
    "Category": "/Travel & Tourism/Accommodations/Hotels, Motels & Resorts/Resorts/Resort Packages"
  },
  {
    "CriterionID": 13806,
    "Category": "/Travel & Tourism/Accommodations/House Swaps & Home Exchanges"
  },
  {
    "CriterionID": 10774,
    "Category": "/Travel & Tourism/Accommodations/Last Minute Accommodation Deals"
  },
  {
    "CriterionID": 10773,
    "Category": "/Travel & Tourism/Accommodations/Ski Accommodations"
  },
  {
    "CriterionID": 12072,
    "Category": "/Travel & Tourism/Accommodations/Ski Accommodations/Ski Condos, Cabins & Townhome Rentals"
  },
  {
    "CriterionID": 12073,
    "Category": "/Travel & Tourism/Accommodations/Ski Accommodations/Ski Lodges & Resorts"
  },
  {
    "CriterionID": 10770,
    "Category": "/Travel & Tourism/Accommodations/Vacation Rentals"
  },
  {
    "CriterionID": 12069,
    "Category": "/Travel & Tourism/Accommodations/Vacation Rentals/Villa Rentals"
  },
  {
    "CriterionID": 10144,
    "Category": "/Travel & Tourism/Air Travel"
  },
  {
    "CriterionID": 10779,
    "Category": "/Travel & Tourism/Air Travel/Air Charter & Charter Jet Services"
  },
  {
    "CriterionID": 10778,
    "Category": "/Travel & Tourism/Air Travel/Airline Tickets, Fares & Flights"
  },
  {
    "CriterionID": 12079,
    "Category": "/Travel & Tourism/Air Travel/Airline Tickets, Fares & Flights/First & Business Class Airfares & Flights"
  },
  {
    "CriterionID": 10153,
    "Category": "/Travel & Tourism/Cruises & Cruise Services"
  },
  {
    "CriterionID": 10802,
    "Category": "/Travel & Tourism/Cruises & Cruise Services/Activity & Theme-Based Cruises"
  },
  {
    "CriterionID": 12096,
    "Category": "/Travel & Tourism/Cruises & Cruise Services/Barge & River Cruises"
  },
  {
    "CriterionID": 10800,
    "Category": "/Travel & Tourism/Cruises & Cruise Services/Last Minute Cruises"
  },
  {
    "CriterionID": 10147,
    "Category": "/Travel & Tourism/Last Minute Travel"
  },
  {
    "CriterionID": 10790,
    "Category": "/Travel & Tourism/Last Minute Travel/Last Minute Airfares & Flights"
  },
  {
    "CriterionID": 10143,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories"
  },
  {
    "CriterionID": 10776,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Luggage"
  },
  {
    "CriterionID": 12075,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Luggage/Carry-On Bags"
  },
  {
    "CriterionID": 12078,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Luggage/Make-Up Bags"
  },
  {
    "CriterionID": 12074,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Luggage/Rolling Luggage"
  },
  {
    "CriterionID": 12077,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Luggage/Suitcases"
  },
  {
    "CriterionID": 10777,
    "Category": "/Travel & Tourism/Luggage & Travel Accessories/Travel Accessories"
  },
  {
    "CriterionID": 10152,
    "Category": "/Travel & Tourism/Luggage Services"
  },
  {
    "CriterionID": 13594,
    "Category": "/Travel & Tourism/Luxury Travel"
  },
  {
    "CriterionID": 10150,
    "Category": "/Travel & Tourism/Specialty Travel"
  },
  {
    "CriterionID": 10793,
    "Category": "/Travel & Tourism/Specialty Travel/Adventure Travel"
  },
  {
    "CriterionID": 13847,
    "Category": "/Travel & Tourism/Specialty Travel/Agritourism"
  },
  {
    "CriterionID": 12093,
    "Category": "/Travel & Tourism/Specialty Travel/Couples Travel & Honeymoons"
  },
  {
    "CriterionID": 10794,
    "Category": "/Travel & Tourism/Specialty Travel/Ecotourism"
  },
  {
    "CriterionID": 10795,
    "Category": "/Travel & Tourism/Specialty Travel/Family Vacations & Travel"
  },
  {
    "CriterionID": 12095,
    "Category": "/Travel & Tourism/Specialty Travel/GLBT Travel"
  },
  {
    "CriterionID": 12092,
    "Category": "/Travel & Tourism/Specialty Travel/Senior Citizen Travel"
  },
  {
    "CriterionID": 12091,
    "Category": "/Travel & Tourism/Specialty Travel/Singles Travel"
  },
  {
    "CriterionID": 10148,
    "Category": "/Travel & Tourism/Tour Operators"
  },
  {
    "CriterionID": 10791,
    "Category": "/Travel & Tourism/Tour Operators/Charter Bus Services"
  },
  {
    "CriterionID": 10792,
    "Category": "/Travel & Tourism/Tour Operators/Sightseeing Tours"
  },
  {
    "CriterionID": 10145,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations"
  },
  {
    "CriterionID": 13582,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Beaches & Islands"
  },
  {
    "CriterionID": 13857,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Historical Sites & Buildings"
  },
  {
    "CriterionID": 13858,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Lakes & Rivers"
  },
  {
    "CriterionID": 13862,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Libraries"
  },
  {
    "CriterionID": 13497,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Museums"
  },
  {
    "CriterionID": 12081,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Regional Parks & Gardens"
  },
  {
    "CriterionID": 13496,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Theme Parks"
  },
  {
    "CriterionID": 12098,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Winter Travel Destinations"
  },
  {
    "CriterionID": 12080,
    "Category": "/Travel & Tourism/Tourist Attractions & Destinations/Zoos & Aquariums"
  },
  {
    "CriterionID": 10146,
    "Category": "/Travel & Tourism/Transportation & Excursions"
  },
  {
    "CriterionID": 10785,
    "Category": "/Travel & Tourism/Transportation & Excursions/Airport Transportation Services"
  },
  {
    "CriterionID": 12087,
    "Category": "/Travel & Tourism/Transportation & Excursions/Airport Transportation Services/Airport Parking Services"
  },
  {
    "CriterionID": 12086,
    "Category": "/Travel & Tourism/Transportation & Excursions/Airport Transportation Services/Airport Rail Service"
  },
  {
    "CriterionID": 12085,
    "Category": "/Travel & Tourism/Transportation & Excursions/Airport Transportation Services/Airport Shuttles & Car Services"
  },
  {
    "CriterionID": 10787,
    "Category": "/Travel & Tourism/Transportation & Excursions/Boat & Yacht Charter"
  },
  {
    "CriterionID": 10783,
    "Category": "/Travel & Tourism/Transportation & Excursions/Bus & Rail Services"
  },
  {
    "CriterionID": 12083,
    "Category": "/Travel & Tourism/Transportation & Excursions/Bus & Rail Services/Bus Services"
  },
  {
    "CriterionID": 12084,
    "Category": "/Travel & Tourism/Transportation & Excursions/Bus & Rail Services/Rail Services"
  },
  {
    "CriterionID": 13023,
    "Category": "/Travel & Tourism/Transportation & Excursions/Bus & Rail Services/Rail Services/Rail Passes"
  },
  {
    "CriterionID": 10782,
    "Category": "/Travel & Tourism/Transportation & Excursions/Car Rental Services"
  },
  {
    "CriterionID": 13831,
    "Category": "/Travel & Tourism/Transportation & Excursions/Carpooling & Ridesharing"
  },
  {
    "CriterionID": 10786,
    "Category": "/Travel & Tourism/Transportation & Excursions/Ferries"
  },
  {
    "CriterionID": 10789,
    "Category": "/Travel & Tourism/Transportation & Excursions/Limousine Services"
  },
  {
    "CriterionID": 13410,
    "Category": "/Travel & Tourism/Transportation & Excursions/Parking Services"
  },
  {
    "CriterionID": 10784,
    "Category": "/Travel & Tourism/Transportation & Excursions/Taxi Services"
  },
  {
    "CriterionID": 10788,
    "Category": "/Travel & Tourism/Transportation & Excursions/Trip Planners & Route Finders"
  },
  {
    "CriterionID": 10151,
    "Category": "/Travel & Tourism/Travel Booking Services"
  },
  {
    "CriterionID": 10843,
    "Category": "/Travel & Tourism/Travel Documents"
  },
  {
    "CriterionID": 12117,
    "Category": "/Travel & Tourism/Travel Documents/Passports & Passport Services"
  },
  {
    "CriterionID": 12119,
    "Category": "/Travel & Tourism/Travel Documents/Travel Consent Forms"
  },
  {
    "CriterionID": 12118,
    "Category": "/Travel & Tourism/Travel Documents/Travel Visas & Visa Services"
  },
  {
    "CriterionID": 10578,
    "Category": "/Travel & Tourism/Travel Media & Publications"
  },
  {
    "CriterionID": 10149,
    "Category": "/Travel & Tourism/Travel Media & Publications/City & Local Guides"
  },
  {
    "CriterionID": 11872,
    "Category": "/Travel & Tourism/Travel Media & Publications/Road Maps"
  },
  {
    "CriterionID": 11874,
    "Category": "/Travel & Tourism/Travel Media & Publications/Travel Books & Guides"
  },
  {
    "CriterionID": 10154,
    "Category": "/Travel & Tourism/Vacation Packages"
  },
  {
    "CriterionID": 10001,
    "Category": "/Vehicles"
  },
  {
    "CriterionID": 10027,
    "Category": "/Vehicles/Boats & Watercraft"
  },
  {
    "CriterionID": 10211,
    "Category": "/Vehicles/Boats & Watercraft/Fishing Boats"
  },
  {
    "CriterionID": 10216,
    "Category": "/Vehicles/Boats & Watercraft/Kayaks"
  },
  {
    "CriterionID": 10212,
    "Category": "/Vehicles/Boats & Watercraft/Personal Watercraft"
  },
  {
    "CriterionID": 10214,
    "Category": "/Vehicles/Boats & Watercraft/Rafts"
  },
  {
    "CriterionID": 10215,
    "Category": "/Vehicles/Boats & Watercraft/Row Boats & Canoes"
  },
  {
    "CriterionID": 10213,
    "Category": "/Vehicles/Boats & Watercraft/Sailboats"
  },
  {
    "CriterionID": 10217,
    "Category": "/Vehicles/Boats & Watercraft/Speedboats & Motorboats"
  },
  {
    "CriterionID": 10210,
    "Category": "/Vehicles/Boats & Watercraft/Yachts"
  },
  {
    "CriterionID": 10191,
    "Category": "/Vehicles/Driving Instruction & Driver Education"
  },
  {
    "CriterionID": 10024,
    "Category": "/Vehicles/Motor Vehicles"
  },
  {
    "CriterionID": 10183,
    "Category": "/Vehicles/Motor Vehicles/Campers & RVs"
  },
  {
    "CriterionID": 10951,
    "Category": "/Vehicles/Motor Vehicles/Campers & RVs/Motorhomes"
  },
  {
    "CriterionID": 10950,
    "Category": "/Vehicles/Motor Vehicles/Campers & RVs/Pop-Up Campers"
  },
  {
    "CriterionID": 10949,
    "Category": "/Vehicles/Motor Vehicles/Campers & RVs/Travel Trailers"
  },
  {
    "CriterionID": 10185,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks"
  },
  {
    "CriterionID": 10956,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/4WD"
  },
  {
    "CriterionID": 10961,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Concept & Future Cars"
  },
  {
    "CriterionID": 10958,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Convertibles"
  },
  {
    "CriterionID": 10953,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Coupes"
  },
  {
    "CriterionID": 10959,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Crossovers"
  },
  {
    "CriterionID": 10955,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Hatchbacks"
  },
  {
    "CriterionID": 10963,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Hybrid & Alternative Vehicles"
  },
  {
    "CriterionID": 13573,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Luxury Cars"
  },
  {
    "CriterionID": 13856,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Microcars & City Cars"
  },
  {
    "CriterionID": 10962,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Pick-Up Trucks"
  },
  {
    "CriterionID": 10957,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/SUVs"
  },
  {
    "CriterionID": 10954,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Sedans"
  },
  {
    "CriterionID": 10952,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Sports Cars"
  },
  {
    "CriterionID": 10964,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Station Wagons"
  },
  {
    "CriterionID": 10960,
    "Category": "/Vehicles/Motor Vehicles/Cars & Trucks/Vans & Minivans"
  },
  {
    "CriterionID": 10186,
    "Category": "/Vehicles/Motor Vehicles/Commercial Vehicles"
  },
  {
    "CriterionID": 13697,
    "Category": "/Vehicles/Motor Vehicles/Commercial Vehicles/Cargo Trucks & Trailers"
  },
  {
    "CriterionID": 10182,
    "Category": "/Vehicles/Motor Vehicles/Motorcycles"
  },
  {
    "CriterionID": 10181,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles"
  },
  {
    "CriterionID": 10945,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles/ATVs"
  },
  {
    "CriterionID": 10946,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles/Dirt Bikes"
  },
  {
    "CriterionID": 10948,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles/Dune Buggies"
  },
  {
    "CriterionID": 10947,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles/Go Karts"
  },
  {
    "CriterionID": 10944,
    "Category": "/Vehicles/Motor Vehicles/Off-Road Vehicles/Snowmobiles"
  },
  {
    "CriterionID": 10187,
    "Category": "/Vehicles/Motor Vehicles/Scooters & Mopeds"
  },
  {
    "CriterionID": 13714,
    "Category": "/Vehicles/Motor Vehicles/Used Motor Vehicles"
  },
  {
    "CriterionID": 10184,
    "Category": "/Vehicles/Motor Vehicles/Vehicle Trailers"
  },
  {
    "CriterionID": 10022,
    "Category": "/Vehicles/Personal Airplanes & Aircraft"
  },
  {
    "CriterionID": 10189,
    "Category": "/Vehicles/Personal Airplanes & Aircraft/Flying Instruction"
  },
  {
    "CriterionID": 10200,
    "Category": "/Vehicles/Personal Airplanes & Aircraft/Personal Aircraft Repair & Maintenance"
  },
  {
    "CriterionID": 10190,
    "Category": "/Vehicles/Vehicle Auctions"
  },
  {
    "CriterionID": 13655,
    "Category": "/Vehicles/Vehicle Dealers"
  },
  {
    "CriterionID": 13657,
    "Category": "/Vehicles/Vehicle Dealers/Boat & Yacht Sales & Brokers"
  },
  {
    "CriterionID": 13656,
    "Category": "/Vehicles/Vehicle Dealers/Car Dealers"
  },
  {
    "CriterionID": 10198,
    "Category": "/Vehicles/Vehicle Donation & Removal"
  },
  {
    "CriterionID": 10195,
    "Category": "/Vehicles/Vehicle Emissions"
  },
  {
    "CriterionID": 10978,
    "Category": "/Vehicles/Vehicle History Reports"
  },
  {
    "CriterionID": 10026,
    "Category": "/Vehicles/Vehicle Parts & Accessories"
  },
  {
    "CriterionID": 10209,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories"
  },
  {
    "CriterionID": 11000,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Covers"
  },
  {
    "CriterionID": 10997,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Emergency Kits & Supplies"
  },
  {
    "CriterionID": 10995,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Mats"
  },
  {
    "CriterionID": 10993,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Modification Parts"
  },
  {
    "CriterionID": 12269,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Modification Parts/Appearance Modifying Parts"
  },
  {
    "CriterionID": 12268,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Modification Parts/Performance Modifying Parts"
  },
  {
    "CriterionID": 10998,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Car Sun Shields"
  },
  {
    "CriterionID": 10996,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Remote Keyless Entry Systems & Car Starters"
  },
  {
    "CriterionID": 10994,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts"
  },
  {
    "CriterionID": 12272,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Automotive Electronic Components"
  },
  {
    "CriterionID": 13131,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Automotive Electronic Components/Car Batteries"
  },
  {
    "CriterionID": 13130,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Automotive Electronic Components/Spark Plugs"
  },
  {
    "CriterionID": 12275,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Car Brakes"
  },
  {
    "CriterionID": 12271,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Car Engines & Engine Parts"
  },
  {
    "CriterionID": 12273,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Car Filters"
  },
  {
    "CriterionID": 12270,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Car Lamps & Lights"
  },
  {
    "CriterionID": 12274,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Car Parts & Accessories/Replacement Car Parts/Windshield Wiper Blades"
  },
  {
    "CriterionID": 10204,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Motorcycle Parts & Accessories"
  },
  {
    "CriterionID": 10983,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Motorcycle Parts & Accessories/Motorcycle Gloves & Gear"
  },
  {
    "CriterionID": 10982,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Motorcycle Parts & Accessories/Motorcycle Helmets"
  },
  {
    "CriterionID": 10202,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Off-Road Vehicle Parts & Accessories"
  },
  {
    "CriterionID": 10201,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Personal Airplane & Aircraft Parts & Accessories"
  },
  {
    "CriterionID": 10208,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Scooter & Moped Parts & Accessories"
  },
  {
    "CriterionID": 10203,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Truck Parts & Accessories"
  },
  {
    "CriterionID": 10205,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Cleansers & Care Supplies"
  },
  {
    "CriterionID": 10207,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Racks"
  },
  {
    "CriterionID": 10206,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts"
  },
  {
    "CriterionID": 10985,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Car & Truck Tires"
  },
  {
    "CriterionID": 10986,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Car & Truck Wheels"
  },
  {
    "CriterionID": 10984,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Motorcycle Tires & Tire Parts"
  },
  {
    "CriterionID": 10991,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Personal Airplane & Aircraft Tires"
  },
  {
    "CriterionID": 10988,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Scooter & Moped Tires"
  },
  {
    "CriterionID": 10992,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Snow Chains"
  },
  {
    "CriterionID": 10990,
    "Category": "/Vehicles/Vehicle Parts & Accessories/Vehicle Tires & Tire Parts/Snow Tires"
  },
  {
    "CriterionID": 10193,
    "Category": "/Vehicles/Vehicle Repair & Maintenance"
  },
  {
    "CriterionID": 10967,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Brake Repair"
  },
  {
    "CriterionID": 10973,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Collision & Auto Body Repair"
  },
  {
    "CriterionID": 10969,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Oil Changes"
  },
  {
    "CriterionID": 10972,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Transmissions & Transmission Repair"
  },
  {
    "CriterionID": 10971,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Tune-Ups"
  },
  {
    "CriterionID": 10981,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Vehicle Painting"
  },
  {
    "CriterionID": 10979,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Vehicle Washing & Detailing"
  },
  {
    "CriterionID": 10968,
    "Category": "/Vehicles/Vehicle Repair & Maintenance/Windshield Repair"
  },
  {
    "CriterionID": 10196,
    "Category": "/Vehicles/Vehicle Specs, Reviews & Comparisons"
  },
  {
    "CriterionID": 10194,
    "Category": "/Vehicles/Vehicle Towing"
  },
  {
    "CriterionID": 10974,
    "Category": "/Vehicles/Vehicle Towing/Boat Towing"
  },
  {
    "CriterionID": 10188,
    "Category": "/Vehicles/Vehicle Warranties & Protection Plans"
  },
  {
    "CriterionID": 10980,
    "Category": "/Vehicles/Vehicle Window Tinting"
  }
]

export const LANGUAGES: Language[] = [
  {
    "languageName": "Arabic",
    "languageCode": "ar",
    "CriterionID": 1019
  },
  {
    "languageName": "Bengali",
    "languageCode": "bn",
    "CriterionID": 1056
  },
  {
    "languageName": "Bulgarian",
    "languageCode": "bg",
    "CriterionID": 1020
  },
  {
    "languageName": "Catalan",
    "languageCode": "ca",
    "CriterionID": 1038
  },
  {
    "languageName": "Chinese (simplified)",
    "languageCode": "zh_CN",
    "CriterionID": 1017
  },
  {
    "languageName": "Chinese (traditional)",
    "languageCode": "zh_TW",
    "CriterionID": 1018
  },
  {
    "languageName": "Croatian",
    "languageCode": "hr",
    "CriterionID": 1039
  },
  {
    "languageName": "Czech",
    "languageCode": "cs",
    "CriterionID": 1021
  },
  {
    "languageName": "Danish",
    "languageCode": "da",
    "CriterionID": 1009
  },
  {
    "languageName": "Dutch",
    "languageCode": "nl",
    "CriterionID": 1010
  },
  {
    "languageName": "English",
    "languageCode": "en",
    "CriterionID": 1000
  },
  {
    "languageName": "Estonian",
    "languageCode": "et",
    "CriterionID": 1043
  },
  {
    "languageName": "Filipino",
    "languageCode": "tl",
    "CriterionID": 1042
  },
  {
    "languageName": "Finnish",
    "languageCode": "fi",
    "CriterionID": 1011
  },
  {
    "languageName": "French",
    "languageCode": "fr",
    "CriterionID": 1002
  },
  {
    "languageName": "German",
    "languageCode": "de",
    "CriterionID": 1001
  },
  {
    "languageName": "Greek",
    "languageCode": "el",
    "CriterionID": 1022
  },
  {
    "languageName": "Gujarati",
    "languageCode": "gu",
    "CriterionID": 1072
  },
  {
    "languageName": "Hebrew",
    "languageCode": "iw",
    "CriterionID": 1027
  },
  {
    "languageName": "Hindi",
    "languageCode": "hi",
    "CriterionID": 1023
  },
  {
    "languageName": "Hungarian",
    "languageCode": "hu",
    "CriterionID": 1024
  },
  {
    "languageName": "Icelandic",
    "languageCode": "is",
    "CriterionID": 1026
  },
  {
    "languageName": "Indonesian",
    "languageCode": "id",
    "CriterionID": 1025
  },
  {
    "languageName": "Italian",
    "languageCode": "it",
    "CriterionID": 1004
  },
  {
    "languageName": "Japanese",
    "languageCode": "ja",
    "CriterionID": 1005
  },
  {
    "languageName": "Kannada",
    "languageCode": "kn",
    "CriterionID": 1086
  },
  {
    "languageName": "Korean",
    "languageCode": "ko",
    "CriterionID": 1012
  },
  {
    "languageName": "Latvian",
    "languageCode": "lv",
    "CriterionID": 1028
  },
  {
    "languageName": "Lithuanian",
    "languageCode": "lt",
    "CriterionID": 1029
  },
  {
    "languageName": "Malay",
    "languageCode": "ms",
    "CriterionID": 1102
  },
  {
    "languageName": "Malayalam",
    "languageCode": "ml",
    "CriterionID": 1098
  },
  {
    "languageName": "Marathi",
    "languageCode": "mr",
    "CriterionID": 1101
  },
  {
    "languageName": "Norwegian",
    "languageCode": "no",
    "CriterionID": 1013
  },
  {
    "languageName": "Persian",
    "languageCode": "fa",
    "CriterionID": 1064
  },
  {
    "languageName": "Polish",
    "languageCode": "pl",
    "CriterionID": 1030
  },
  {
    "languageName": "Portuguese",
    "languageCode": "pt",
    "CriterionID": 1014
  },
  {
    "languageName": "Romanian",
    "languageCode": "ro",
    "CriterionID": 1032
  },
  {
    "languageName": "Russian",
    "languageCode": "ru",
    "CriterionID": 1031
  },
  {
    "languageName": "Serbian",
    "languageCode": "sr",
    "CriterionID": 1035
  },
  {
    "languageName": "Slovak",
    "languageCode": "sk",
    "CriterionID": 1033
  },
  {
    "languageName": "Slovenian",
    "languageCode": "sl",
    "CriterionID": 1034
  },
  {
    "languageName": "Spanish",
    "languageCode": "es",
    "CriterionID": 1003
  },
  {
    "languageName": "Swedish",
    "languageCode": "sv",
    "CriterionID": 1015
  },
  {
    "languageName": "Tamil",
    "languageCode": "ta",
    "CriterionID": 1130
  },
  {
    "languageName": "Telugu",
    "languageCode": "te",
    "CriterionID": 1131
  },
  {
    "languageName": "Thai",
    "languageCode": "th",
    "CriterionID": 1044
  },
  {
    "languageName": "Turkish",
    "languageCode": "tr",
    "CriterionID": 1037
  },
  {
    "languageName": "Ukrainian",
    "languageCode": "uk",
    "CriterionID": 1036
  },
  {
    "languageName": "Urdu",
    "languageCode": "ur",
    "CriterionID": 1041
  },
  {
    "languageName": "Vietnamese",
    "languageCode": "vi",
    "CriterionID": 1040
  }
]

export interface Language{
  languageName?: string,
  languageCode?: string,
  CriterionID?: number
}

export interface PROD_AND_CAT{
  CriterionID?: number,
  Category?: string
}

export interface KEYWORD_RESULT{
  keyword?: string,
  volume?: number
}

export interface KEYWORDS_TARGET{
  keyword?: string,
  volume?: number,
  criterionId?: string,
}

export const SCHEDULE = [
    {
      "text": "00:00",
    "hour": "0",
    "h": 0,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "00:15",
       "hour": "0",
       "h": 0,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "00:30",
       "hour": "0",
       "h": 0,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "00:45",
       "hour": "0",
       "h": 0,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "01:00",
       "hour": "1",
       "h": 1,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "01:15",
       "hour": "1",
       "h": 1,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "01:30",
       "hour": "1",
       "h": 1,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "01:45",
       "hour": "1",
       "h": 1,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "02:00",
       "hour": "2",
       "h": 2,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "02:15",
       "hour": "2",
       "h": 2,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "02:30",
       "hour": "2",
       "h": 2,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "02:45",
       "hour": "2",
       "h": 2,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "03:00",
       "hour": "3",
       "h": 3,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "03:15",
       "hour": "3",
       "h": 3,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "03:30",
       "hour": "3",
       "h": 3,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "03:45",
       "hour": "3",
       "h": 3,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "04:00",
       "hour": "4",
       "h": 4,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "04:15",
       "hour": "4",
       "h": 4,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "04:30",
       "hour": "4",
       "h": 4,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "04:45",
       "hour": "4",
       "h": 4,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "05:00",
       "hour": "5",
       "h": 5,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "05:15",
       "hour": "5",
       "h": 5,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "05:30",
       "hour": "5",
       "h": 5,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "05:45",
       "hour": "5",
       "h": 5,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "06:00",
       "hour": "6",
       "h": 6,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "06:15",
       "hour": "6",
       "h": 6,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "06:30",
       "hour": "6",
       "h": 6,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "06:45",
       "hour": "6",
       "h": 6,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
     {
      "text": "07:00",
       "hour": "7",
       "h": 7,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "07:15",
       "hour": "7",
       "h": 7,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "07:30",
       "hour": "7",
       "h": 7,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "07:45",
       "hour": "7",
       "h": 7,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
         {
      "text": "08:00",
           "hour": "8",
           "h": 8,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "08:15",
       "hour": "8",
       "h": 8,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "08:30",
       "hour": "8",
       "h": 8,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "08:45",
       "hour": "8",
       "h": 8,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
         {
      "text": "09:00",
           "hour": "9",
           "h": 9,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "09:15",
       "hour": "9",
       "h": 9,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "09:30",
       "hour": "9",
       "h": 9,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "09:45",
       "hour": "9",
       "h": 9,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
        {
      "text": "10:00",
          "hour": "10",
          "h": 10,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "10:15",
       "hour": "10",
       "h": 10,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "10:30",
       "hour": "10",
       "h": 10,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "10:45",
       "hour": "10",
       "h": 10,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "11:00",
            "hour": "11",
            "h": 11,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "11:15",
       "hour": "11",
       "h": 11,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "11:30",
       "hour": "11",
       "h": 11,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "11:45",
       "hour": "11",
       "h": 11,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "12:00",
            "hour": "12",
            "h": 12,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "12:15",
       "hour": "12",
       "h": 12,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "12:30",
       "hour": "12",
       "h": 12,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "12:45",
       "hour": "12",
       "h": 12,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "13:00",
            "hour": "13",
            "h": 13,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "13:15",
       "hour": "13",
       "h": 13,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "13:30",
       "hour": "13",
       "h": 13,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "13:45",
       "hour": "13",
       "h": 13,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "14:00",
            "hour": "14",
            "h": 14,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "14:15",
       "hour": "14",
       "h": 14,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "14:30",
       "hour": "14",
       "h": 14,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "14:45",
       "hour": "14",
       "h": 14,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "15:00",
            "hour": "15",
            "h": 15,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "15:15",
       "hour": "15",
       "h": 15,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "15:30",
       "hour": "15",
       "h": 15,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "15:45",
       "hour": "15",
       "h": 15,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "16:00",
            "hour": "16",
            "h": 16,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "16:15",
       "hour": "16",
       "h": 16,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "16:30",
       "hour": "16",
       "h": 16,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "16:45",
       "hour": "16",
      "h": 16,
       "minute": "FORTY_FIVE",
      "m": 45,
    },
          {
      "text": "17:00",
            "hour": "17",
            "h": 17,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "17:15",
       "hour": "17",
       "h": 17,
       "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "17:30",
       "hour": "17",
       "h": 17,
       "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "17:45",
       "hour": "17",
       "h": 17,
       "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "18:00",
            "hour": "18",
            "h": 18,
       "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "18:15",
       "hour": "18",
       "h": 18,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "18:30",
       "hour": "18",
       "h": 18,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "18:45",
       "hour": "18",
       "h": 18,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "19:00",
            "hour": "19",
            "h": 19,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "19:15",
       "hour": "19",
       "h": 19,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "19:30",
       "hour": "19",
       "h": 19,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "19:45",
       "hour": "19",
       "h": 19,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "20:00",
            "hour": "20",
            "h": 20,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "20:15",
       "hour": "20",
       "h": 20,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "20:30",
       "hour": "20",
       "h": 20,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "20:45",
       "hour": "20",
       "h": 20,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "21:00",
            "hour": "21",
            "h": 21,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "21:15",
       "hour": "21",
       "h": 21,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "21:30",
       "hour": "21",
       "h": 21,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "21:45",
       "hour": "21",
       "h": 21,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "22:00",
            "hour": "22",
            "h": 22,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "22:15",
       "hour": "22",
       "h": 22,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "22:30",
       "hour": "22",
       "h": 22,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "22:45",
       "hour": "22",
       "h": 22,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
          {
      "text": "23:00",
            "hour": "23",
            "h": 23,
      "m": 0,
      "minute": "ZERO",
    },
     {
      "text": "23:15",
       "hour": "23",
       "h": 23,
      "m": 15,
      "minute": "FIFTEEN",
    },
     {
      "text": "23:30",
       "hour": "23",
       "h": 23,
      "m": 30,
      "minute": "THIRTY",
    },
     {
      "text": "23:45",
       "hour": "23",
       "h": 23,
      "m": 45,
      "minute": "FORTY_FIVE",
    },
  ]


export interface BizaoResult{
  data?: {
    message?: string;
  notif_token?: string;
  pay_token?: string;
  payment_url?: string;
  status?: number;
  }
}


  export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
    queryParams?: any; 
    children?: NavItem[];
    href?: string;
    img?: string;
    
}

export const navItems: NavItem[] = [
    {
      displayName: 'DevFestFL',
      iconName: 'recent_actors',
      route: 'devfestfl',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'devfestfl/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'devfestfl/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'devfestfl/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'devfestfl/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'devfestfl/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'devfestfl/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'devfestfl/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'devfestfl/feedback'
        }
      ]
    },
    {
      displayName: 'Disney',
      iconName: 'videocam',
      route: 'disney',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'disney/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'disney/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'disney/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'disney/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'disney/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'disney/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'disney/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'disney/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'disney/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'disney/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'disney/sessionswhat-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'disney/sessionsmy-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'disney/sessionsbecome-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'disney/feedback'
        }
      ]
    },
    {
      displayName: 'Orlando',
      iconName: 'videocam',
      route: 'orlando',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'orlando/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'orlando/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'orlando/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'orlando/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'orlando/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'orlando/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'orlando/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'orlando/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'orlando/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'orlando/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'orlando/feedback'
        }
      ]
    },
    {
      displayName: 'Maleficent',
      iconName: 'videocam',
      route: 'maleficent',
      children: [
        {
          displayName: 'Speakers',
          iconName: 'group',
          route: 'maleficent/speakers',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'maleficent/speakers/michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/michael-prentice/material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'maleficent/speakers/stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/stephen-fluin/what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'maleficent/speakers/mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'maleficent/speakers/mike-brocchi/become-angular-tailor'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Sessions',
          iconName: 'speaker_notes',
          route: 'maleficent/sessions',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'maleficent/sessions/material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'maleficent/sessions/what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'maleficent/sessions/my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'maleficent/sessions/become-angular-tailor'
            }
          ]
        },
        {
          displayName: 'Feedback',
          iconName: 'feedback',
          route: 'maleficent/feedback'
        }
      ]
    },
  ];



  export class FirebaseErrors {
    static Parse(errorCode: string): string {
  
      let message: string;
  
      switch (errorCode) {
        case 'auth/wrong-password':
          message = 'Invalid login credentials.';
          break;
        case 'auth/network-request-failed':
          message = 'Please check your internet connection';
          break;
        case 'auth/too-many-requests':
          message =
            'We have detected too many requests from your device. Take a break please!';
          break;
        case 'auth/user-disabled':
          message =
            'Your account has been disabled or deleted. Please contact the system administrator.';
          break;
        case 'auth/requires-recent-login':
          message = 'Please login again and try again!';
          break;
        case 'auth/email-already-exists':
          message = 'Email address is already in use by an existing user.';
          break;
        case 'auth/user-not-found':
          message =
            'We could not find user account associated with the email address or phone number.';
          break;
        case 'auth/phone-number-already-exists':
          message = 'The phone number is already in use by an existing user.';
          break;
        case 'auth/invalid-phone-number':
          message = 'The phone number is not a valid phone number!';
          break;
        case 'auth/invalid-email  ':
          message = 'The email address is not a valid email address!';
          break;
        case 'auth/cannot-delete-own-user-account':
          message = 'You cannot delete your own user account.';
          break;
         default:
          message = 'Oops! Something went wrong. Try again later.';
          break;
      }
  
      return message;
    }
  }