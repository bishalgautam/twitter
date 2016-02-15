//
//  TweetsViewController.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/7/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//

import UIKit

class TweetsViewController: UIViewController,UITableViewDataSource,UITableViewDelegate  {
    
    var tweets: [Tweet]?
    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var tweetTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        tableView.dataSource = self
        tableView.delegate = self
        tableView.estimatedRowHeight = 120.0
        tableView.rowHeight = UITableViewAutomaticDimension

        
        TwitterClient.sharedinstance.homeTimelineWithParams(nil) { (tweets, error) -> () in
            self.tweets = tweets
            self.tableView.reloadData()
        }
        
   }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    @IBAction func onlogout(sender: AnyObject) {
        User.currentUser?.logout()
    }
    
    
    @IBAction func onMyProfile(sender: AnyObject) {
        
    }
    
    func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int{
        if tweets != nil {
           // print("rashu",tweets?.count)
            return (tweets?.count)!
        }
        return 0
    }
    
    func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell{
        let cell = tableView.dequeueReusableCellWithIdentifier("TweetCell", forIndexPath: indexPath) as! TweetViewCell
        
        let tweet = tweets![indexPath.row]
        cell.realNameLabel.text = tweet.user!.name
        cell.userNamelabel.text = "@" + tweet.user!.screenname!
        cell.posterImageLabel.setImageWithURL(NSURL(string: tweet.user!.profileImageUrl!)!)
        cell.tweetLabel.text = tweet.text
        cell.favoriteCountLabel.text = String(tweet.favCount!)
        cell.retweetCountLabel.text = String(tweet.retweetCount!)
        cell.tweetIdSpec = tweet.tweetId
       
        
        
        let elapsedTime = NSDate().timeIntervalSinceDate(tweet.createdAt!)
        let duration = Int(elapsedTime)
        var finalTime = "0"
        
        if duration / (360 * 24) >= 1 {
            finalTime = String(duration / (360 * 24)) + "d"
        }
        else if duration / 360 >= 1 {
            finalTime = String(duration / 360) + "h"
            
        }
        else if duration / 60 >= 1 {
            finalTime = String(duration / 60) + "min"
        }
        else {
            finalTime = String(duration) + "s"
        }
        
        cell.createdTimeLabel.text = String(finalTime)
        
        var imageView = cell.posterImageLabel
        let tapGestureRecognizer = UITapGestureRecognizer(target:self, action:Selector("imageTapped:"))
        imageView.userInteractionEnabled = true
        imageView.addGestureRecognizer(tapGestureRecognizer)
        
        return cell
    }

    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        if segue.identifier == "myProfileSegue" {
        
        }else if segue.identifier == "userProfileSegue" {
            let tweet = sender as! Tweet
            let userProfileViewController = segue.destinationViewController as! UserProfileViewController
            userProfileViewController.user = tweet.user
        }
        else{
        let cell = sender as! UITableViewCell
        let indexPath = tableView.indexPathForCell(cell)
        let tweet = tweets![indexPath!.row]
        let detailViewController1 = segue.destinationViewController as! detailViewController
        detailViewController1.tweet = tweet
        }

        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    
    
    
    func imageTapped(sender: UITapGestureRecognizer) {
        let tapLocation = sender.locationInView(self.tableView)
        let indexPath = self.tableView.indexPathForRowAtPoint(tapLocation)
        let tweet = tweets![indexPath!.row]
        
        self.performSegueWithIdentifier("userProfileSegue", sender: tweet)
    }

    @IBAction func onTweet(sender: AnyObject) {
        TwitterClient.sharedinstance.makeTweet(tweetTextField.text!)
        tweetTextField.text = ""
        
    }
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
      //  [TextField become FirstResponder];
        print("view did appear")
    }
   }

