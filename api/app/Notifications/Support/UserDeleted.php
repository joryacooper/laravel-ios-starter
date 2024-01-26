<?php

namespace App\Notifications\Support;

use App\Models\User;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Slack\BlockKit\Blocks\SectionBlock;
use Illuminate\Notifications\Slack\SlackMessage;

class UserDeleted extends Notification
{
    public function __construct(
        private User $deleted
    ) {
    }

    public function via($notifiable)
    {
        return ['slack'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Slack\SlackMessage
     */
    public function toSlack($notifiable)
    {
        return (new SlackMessage)
            ->sectionBlock(function (SectionBlock $b) {
                $b->text("*ACTION REQUIRED:* User delete request.\nClear user data in 7 days.")->markdown();
            })->sectionBlock(function(SectionBlock $b) {
                $b->text("*email:* {$this->deleted->email}\n*id:* {$this->deleted->id}")->markdown();
            });
    }
}
