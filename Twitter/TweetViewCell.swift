//
//  TweetViewCell.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/7/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//

import UIKit

class TweetViewCell: UITableViewCell {
    
    
    @IBOutlet weak var posterImageLabel: UIImageView!
    @IBOutlet weak var realNameLabel: UILabel!
    @IBOutlet weak var userNamelabel: UILabel!
    @IBOutlet weak var createdTimeLabel: UILabel!
   
    @IBOutlet weak var favoriteCountLabel: UILabel!
    @IBOutlet weak var retweetCountLabel: UILabel!
    @IBOutlet weak var tweetLabel: UILabel!
    
    var tweetIdSpec: String!
    
    //var tweet: Tweet! {
    //    didSet {
    //      nameName.text = tweet.name
    //   posterLabel.setImageWithURL(tweet.ratingImageURL!)
        /*    thumbImageView.setImageWithURL(business.imageURL!)
            catoriesLabel.text = business.categories
            addressLabel.text = business.address
            reviewLabel.text = "\(business.reviewCount!) Reviews" */
            
    // distanceLabel.text = business.distance
            
            
      //  }
   // }


    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
        
        userNamelabel.preferredMaxLayoutWidth = userNamelabel.frame.size.width
        //realNameLabel.preferredMaxLayoutWidth = realNameLabel.frame.size.width
        tweetLabel.preferredMaxLayoutWidth = tweetLabel.frame.size.width
        
    }

    override func setSelected(selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    @IBAction func onFavourite(sender: AnyObject) {
        
        TwitterClient.sharedinstance.retweet(tweetIdSpec!)
    }
    @IBAction func onReweets(sender: AnyObject) {
      TwitterClient.sharedinstance.retweet(tweetIdSpec!)
    }
}
