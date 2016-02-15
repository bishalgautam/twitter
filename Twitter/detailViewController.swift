//
//  detailViewController.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/14/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//

import UIKit

class detailViewController: UIViewController {
    
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var screenNameLabel: UILabel!
    
    @IBOutlet weak var descLabel: UILabel!
    var tweet: Tweet!
    
    @IBOutlet weak var timeLabel: UILabel!

    @IBOutlet weak var retweetCtLabel: UILabel!

    @IBOutlet weak var likeLabel: UILabel!
   
    @IBOutlet weak var likesCtLabel: UILabel!
    @IBOutlet weak var profileImageView: UIImageView!
    @IBOutlet weak var retweetLabel: UILabel!
    
    @IBOutlet weak var replyTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        nameLabel.text = tweet.user?.name
        screenNameLabel.text = "@" + (tweet.user?.screenname)!
        descLabel.text = tweet.text
        retweetLabel.text = ""
        likeLabel.text = ""
        retweetCtLabel.text = ""
        likesCtLabel.text = ""
        if tweet.retweetCount > 0 {
            retweetCtLabel.text = String(tweet.retweetCount!)
            retweetLabel.text = "Retweets"
        }
        if tweet.favCount > 0 {
            likesCtLabel.text = String(tweet.favCount!)
            likeLabel.text = "Likes"
        }
        timeLabel.text = tweet.createdAtString
        profileImageView.setImageWithURL(NSURL(string: tweet.user!.profileImageUrl!)!)
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func onback(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: nil)
    }
    

    @IBAction func onRetweet(sender: AnyObject) {
        TwitterClient.sharedinstance.retweet(tweet.tweetId!)
    }
    
    @IBAction func onfavorite(sender: AnyObject) {
        TwitterClient.sharedinstance.favorite(tweet.tweetId!)
    }
    
    @IBAction func onreply(sender: AnyObject) {
        TwitterClient.sharedinstance.reply(replyTextField!.text!, statusId: tweet.tweetId!)
        
        replyTextField.text = ""
    }
    
   
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
