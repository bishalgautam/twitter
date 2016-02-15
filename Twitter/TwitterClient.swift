

//
//  TwitterClient.swift
//  Twitter
//
//  Created by Bishal Gautam on 2/2/16.
//  Copyright © 2016 Bishal Gautam. All rights reserved.
//
import BDBOAuth1Manager
import UIKit
import AFNetworking


let twitterConsumerKey = "PN656jc3bnKuNcKGFYS8W8uIt"
let twitterBaseURl = NSURL(string : "https://api.twitter.com" )
let twitterConsumerSecret = "NAzcFfS5v3cJg1Ld9Fd0rtCu8KXLdir9idm3fCfcdPLp8hijlX"



class TwitterClient: BDBOAuth1SessionManager {
    
    var loginCompletion: ((user: User?, error: NSError?)->())?
    
    
    class var sharedinstance : TwitterClient{
        struct Static {
            static let instance = TwitterClient(baseURL: twitterBaseURl, consumerKey: twitterConsumerKey , consumerSecret :twitterConsumerSecret )
        }
        return Static.instance
        
    }
    
    func loginWithCompletion ( completion : ( user : User? , error: NSError?) ->()){
        loginCompletion = completion
       // Fetch request token and redirect to authorization page
        TwitterClient.sharedinstance.requestSerializer.removeAccessToken()
        TwitterClient.sharedinstance.fetchRequestTokenWithPath("oauth/request_token", method: "GET", callbackURL: NSURL(string: "cptwitterdemo://oauth"), scope: nil, success: { (requestToken: BDBOAuth1Credential!) -> Void in
            print("Got the request token")
            var authURL = NSURL(string: "https://api.twitter.com/oauth/authorize?oauth_token=\(requestToken.token)")
            UIApplication.sharedApplication().openURL(authURL!)
            
            }) { (error: NSError!) -> Void in
                print("Error getting request token: \(error)")
                self.loginCompletion?(user: nil, error: error )
        }
        
    }
    
    func homeTimelineWithParams(params:NSDictionary?,completion: (tweets:[Tweet]?,error : NSError?) ->()){
        
        TwitterClient.sharedinstance.GET("1.1/statuses/home_timeline.json", parameters: params, success: { (operation : NSURLSessionDataTask, response: AnyObject?) -> Void in
            
            var tweets = Tweet.tweetsWithArray(response as! [NSDictionary])
            
            /*for tweet in tweets{
            print("text \(tweet.text), created \(tweet.createdAt)")
            }*/
            completion(tweets: tweets, error: nil )
            
            }, failure: { (operation: NSURLSessionDataTask?, error: NSError!) -> Void in
                
                print("It did not work")
                self.loginCompletion?(user:nil, error : error)
                completion(tweets: nil, error: NSError?.self as? NSError)
        })
        
        
        
    }

    
    
    func openURL(url: NSURL){
        
        fetchAccessTokenWithPath("oauth/access_token", method: "POST", requestToken: BDBOAuth1Credential(queryString: url.query), success: { (accessToken: BDBOAuth1Credential!) -> Void in
            print("Got access token")
            
        TwitterClient.sharedinstance.requestSerializer.saveAccessToken(accessToken)
            
        TwitterClient.sharedinstance.GET("1.1/account/verify_credentials.json", parameters: nil, progress: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
                print("It worked!!!")
                //  print(response)
                var user = User(dictionary: response as! NSDictionary)
                User.currentUser = user
                print ("user: \(user.name)")
                self.loginCompletion?(user: user , error: nil)
            },  failure: { (operation: NSURLSessionDataTask?, error: NSError) -> Void in
                    //print(error)
                     print("Error getting Current user")
                    self.loginCompletion?(user: nil, error: error )
                    
            })
            
            TwitterClient.sharedinstance.GET("1.1/statuses/home_timeline.json", parameters: nil, progress: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
                //print("It worked!!!")
                 // print(response)
                var tweets = Tweet.tweetsWithArray(response as! [NSDictionary])
                
                for tweet in tweets {
                    print("Tweet:\(tweet.text), created:\(tweet.createdAt)")
       
                }
                
                }, failure: { (operation: NSURLSessionDataTask?, error: NSError) -> Void in
                    //print(error)
                    print("Error getting home time line")
            })
            
               }) { (error: NSError!) -> Void in
                print("Failed to get access token")
                self.loginCompletion?(user: nil, error: error )
        }

        
    }
   
    func retweet(tweetId: String) {
        
        TwitterClient.sharedinstance.POST("1.1/statuses/retweet/\(tweetId).json", parameters: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
            print("successful retweet")
            }) { (opreation: NSURLSessionDataTask?, error: NSError) -> Void in
                print("can't retweet")
        }
    }
    
    func favorite(tweetId: String) {
        
        TwitterClient.sharedinstance.POST("1.1/favorites/create.json?id=\(tweetId)", parameters: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
            print("successful fav")
            }) { (opreation: NSURLSessionDataTask?, error: NSError) -> Void in
                print("can't fav")
        }
     }
    
    
    func reply(text: String, statusId: String) {
        var escapedText = text.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)
        print("1.1/statuses/update.json?status=\(escapedText!)?in_reply_to_status_id=\(statusId)")
        TwitterClient.sharedinstance.POST("1.1/statuses/update.json?status=\(escapedText!)&in_reply_to_status_id=\(statusId)", parameters: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
            print("successful reply")
            }) { (operation: NSURLSessionDataTask?, error: NSError) -> Void in
                print("can't reply")
        }
        
    }
    
    func getProfile(screenName: String!) {
        TwitterClient.sharedinstance.GET("1.1/users/show.json?screen_name=\(screenName!)", parameters: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
            print("Successfully got user")
            print("\(response)")
            
            }) { (operation: NSURLSessionDataTask?, error: NSError) -> Void in
                print("Can't get user")
        }
        
    }
    
    func makeTweet(text: String) {
        var escapedText = text.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)
        
        TwitterClient.sharedinstance.POST("1.1/statuses/update.json?status=\(escapedText!)", parameters: nil, success: { (operation: NSURLSessionDataTask, response: AnyObject?) -> Void in
            print("successful tweet")
            }) { (operation: NSURLSessionDataTask?, error: NSError) -> Void in
                print("can't tweet")
        }
        
        
}

}

