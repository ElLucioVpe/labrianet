import React from "react";
import ProfileUserInfo from "./ProfileUserInfo";

export const ProfileUserStats = () => {
    return (
        <div class="profile-user-stats">
            <table>
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Savings</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>January</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>February</td>
                    <td>$80</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td>Sum</td>
                    <td>$180</td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ProfileUserStats