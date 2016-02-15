//
//  MyProfileViewController.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/14/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//

import UIKit

class MyProfileViewController: UIViewController {
    
    @IBOutlet weak var profileImageView: UIImageView!

    @IBOutlet weak var screenNameLabel: UILabel!
    @IBOutlet weak var nameLabel: UILabel!
    
    @IBOutlet weak var followerCtLabel: UILabel!
    @IBOutlet weak var followingCtLabel: UILabel!
    @IBOutlet weak var tweetCtlabel: UILabel!
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        nameLabel.text = User.currentUser?.name
        screenNameLabel.text = "@" + (User.currentUser?.screenname!)!
        profileImageView.setImageWithURL(NSURL(string: (User.currentUser?.profileImageUrl!)!)!)
        tweetCtlabel.text = String(User.currentUser!.dictionary["statuses_count"]!)
        followingCtLabel.text = String(User.currentUser!.dictionary["friends_count"]!)
        followerCtLabel.text = String(User.currentUser!.dictionary["followers_count"]!)


        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func onBack(sender: AnyObject) {
        self.dismissViewControllerAnimated(true, completion: nil)

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
