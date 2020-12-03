import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from 'react'
import "./styles.css"

function Slider() {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
        <div className="slider">
            <Carousel 
                showDots={true}
                responsive={responsive}
                infinite={true}
            >
                <div>
                    <img src="money_notes.png" className="slider_img"/>
                    <center>
                        <p className="slider_para top_slider_para">Never again worry about your lendings / borrowings.</p>
                        <p className="slider_para lower_slider_para">Start using PartyHost, your own online ledger.</p>
                        <br /> <br />
                    </center>
                </div>
                <div>
                    <img src="party_icon.png" className="slider_img"/>
                    <center>
                        <p className="slider_para top_slider_para">You can create groups with various friends and divide up what each person owes</p>
                        <p className="slider_para">All your shared expenses and IOUs are organized in one place and everyone in the group can see the amount they owe.</p>
                    </center>
                </div>
                <div>
                    <img src="borrowing_icon.png" className="slider_img" style={{height: "250px"}}/>
                    <center>
                        <p className="slider_para top_slider_para" style={{marginTop: "13%"}}>It tracks borrowing and lending over time.</p>
                        <p className="slider_para">And, until the balance is settled up, each person’s outstanding balance may go up and down.</p>
                    </center>
                </div>
                <div>
                    <img src="clock_icon.png" className="slider_img"/>
                    <center>
                        <p className="slider_para top_slider_para">PartyHost sends reminders at the end of the month so everyone can pay what they owe and go into a new month with a fresh start.</p>
                    </center>
                </div>
            </Carousel>
        </div>
    )
}
export default Slider