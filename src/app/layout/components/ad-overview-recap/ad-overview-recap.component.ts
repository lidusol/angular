import { Component, OnInit, ViewChild, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsRoutingModule } from 'src/app/accounts/accounts-routing.modules';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { DisplayService } from 'src/app/campaigns-management/services/display.service';
import { YoutubeService } from 'src/app/campaigns-management/services/youtube.service';
import { Display, Ads } from 'src/app/campaigns-management/models/display.models';
import {Account, User_Role} from '../../../utils/data'
import { ToolbarItems, ContextMenuItem, GridLine, SelectionSettingsModel, GridComponent } from '@syncfusion/ej2-angular-grids';
import { LocalStorageService } from '../../services/local-storage.service';
import { LyTheme2 } from '@alyle/ui';
import {AnimationType} from '../ads-preview-collections/carousel.animations'
import { AdsPreviewCollectionsComponent } from '../ads-preview-collections/ads-preview-collections.component';
import { take } from 'rxjs/operators';

const STYLES = ({
  carousel: {
    margin: 'auto',
    // responsive
    maxWidth: '200px',
    height: '200px',
    minHeight: '150px',
    maxHeight: '200px'
  },
  carouselItem: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    padding: '1em 1em 48px',
    boxSizing: 'border-box',
    color: '#fff',
    '&:nth-child(3)': {
      color: '#2b2b2b'
    }
  }
});

@Component({
  selector: 'adf-ad-overview-recap',
  templateUrl: './ad-overview-recap.component.html',
  styleUrls: ['./ad-overview-recap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdOverviewRecapComponent implements OnInit {
  ad_group_id: number;
  public selectionSettings: Object;
  public customAttributes1: object;
  public customAttributes2: object;
  public customAttributes3: object;
  public selectedOptionStats1: string = "Clics"
  public selectedOptionStats3: string = "Impressions"
  public selectedOptionStats2: string  ="Dépenses"
   statsOptions = [
    { text: 'Clics', value: 'clicks' },
    { text: 'Dépenses', value: 'costs' },
    { text: 'Ctr', value: 'ctr' },
    { text: 'Interactions', value: 'interactions' },
    { text: 'Conversions', value: 'conversions' },
    { text: 'Taux de conversion', value: 'convRate' },
  ]

   animationType = AnimationType.Scale;

  animationTypes = [
    {
      name: "Scale",
      value: AnimationType.Scale
    },
    {
      name: "Fade",
      value: AnimationType.Fade
    },
    {
      name: "Flip",
      value: AnimationType.Flip
    },
    {
      name: "Jack In The Box",
      value: AnimationType.JackInTheBox
    }
  ];
  @ViewChild('gridCampaignsRecap', {static: false}) gridCampaign: GridComponent
   @ViewChild('adsCollections', {static: false}) adsCollections: AdsPreviewCollectionsComponent
  uid: string = ""
  adf_account_id: string = ""
  readonly classes = this._theme.addStyleSheet(STYLES);
  constructor(private route: ActivatedRoute, private accountsService: AccountsService, private displayService: DisplayService, private router: Router, private storageService: LocalStorageService, private _theme: LyTheme2, private youtubeService: YoutubeService) { }
  ads: Ads[] = []
  accounts: Account[] = []


  goReviewNotPublish(id: string, type: string) {
    if (type === "DISPLAY") {
      this.router.navigate(['/campaigns/review/display'], {queryParams: {cid: id, uid: this.uid}})
    }
  }
  ngOnInit(): void {
 
     
        
    this.customAttributes1 = { class: 'customCss1' };
    this.customAttributes2 = { class: 'customCss2' };
    this.customAttributes3 = {class: 'customCss3'};
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  //  this.getData()
      

  }

  selectHighlightEnter(id: string) {
    document.getElementById(id).classList.add('highlight')
  }
  selectHighlightLeave(id: string) {
     document.getElementById(id).classList.remove('highlight')
  }
  user_role: User_Role = undefined
  @Output() change: EventEmitter<string> = new EventEmitter<string>()
  onChange(arg: string) {
    this.getData()
  }
  getData() {
    this.ads = []
    this.storageService.getUserIdAndAccountId().then(response => {
      //console.log(response)
      if (response !== null) {
        this.adf_account_id = response.aacid
        this.user_role = response.role
        if (response.fromOwned) {
          this.displayService.getListCampaign(response.auid, this.adf_account_id).pipe(take(1)).subscribe(campaignsDisplay => {
              let campaigns: Display[] = campaignsDisplay
              if(campaigns.length>0){
                campaigns.forEach((campaign, index, arr) => {
                  if (campaign.id_campagne !== 0) {
                    this.displayService.getListAdsWithAdGroupId(campaign.ad_group_id).pipe(take(1)).subscribe(ads => {
                      //console.log(ads)
                      if(ads.length>0){
                        this.ads = [...this.ads, ...ads]
               this.adsCollections.slides = this.ad_group_id?this.ads.filter(ad=>parseInt(ad.ad_group_id.toString())===this.ad_group_id):this.ads
               this.adsCollections.user_role = this.user_role
               this.adsCollections.preloadImages()
  
                      }else{
                        this.adsCollections.isLoading = false
                        this.adsCollections.detectChanges()
                      }
                    })
                    
                  }else{
                    this.adsCollections.isLoading = false
                    this.adsCollections.detectChanges()
                  }
                })

              }else{
                this.adsCollections.isLoading = false
                  this.adsCollections.detectChanges()
              }
          
          })
       
          
        } else {
          this.displayService.getListCampaign(response.account.owner, this.adf_account_id).pipe(take(1)).subscribe(campaignsDisplay => {
            let campaigns: Display[] = campaignsDisplay
            if(campaigns.length>0){
              campaigns.forEach((campaign, index, arr) => {
                if (campaign.id_campagne !== 0) {
                  this.displayService.getListAdsWithAdGroupId(campaign.ad_group_id).pipe(take(1)).subscribe(ads => {
                    //console.log(ads)
                    if(ads.length>0){
                      this.ads = [...this.ads, ...ads]
             this.adsCollections.slides = this.ad_group_id?this.ads.filter(ad=>parseInt(ad.ad_group_id.toString())===this.ad_group_id):this.ads
             this.adsCollections.user_role = this.user_role
             this.adsCollections.preloadImages()

                    }else{
                      this.adsCollections.isLoading = false
                      this.adsCollections.detectChanges()
                    }
                  })
                  
                }else{
                  this.adsCollections.isLoading = false
                  this.adsCollections.detectChanges()
                }
              })

            }else{
              this.adsCollections.isLoading = false
                  this.adsCollections.detectChanges()
            }
          })
          
        }
      }
    })
  }

   onDataBound(args:any):void {
       
        
   }

}
