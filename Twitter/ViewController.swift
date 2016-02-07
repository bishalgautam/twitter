//
//  ViewController.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/2/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//

import BDBOAuth1Manager
import UIKit
import AFNetworking

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func onLogin(sender: AnyObject) {
        TwitterClient.sharedinstance.loginWithCompletion(){
            (user: User?, error: NSError?) in
            if user != nil {
               // perform segue
             self.performSegueWithIdentifier("loginSegue", sender: self)
                
            }else{
                // handle error
            }
        }
 
    }

}

