<?php

namespace App\Notifications\AuthUser;


use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Lang;

class UserDeleted extends Notification
{
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  \App\Models\User  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject(Lang::get('Your account has been deleted'))
            ->line(Lang::get('You are receiving this email because we received a request to delete your account. Your account has been deleted.'))
            ->line(Lang::get('Your account and data will be permanently deleted in 7 days.'))
            ->line(Lang::get('If you did not make this request or you think it is a mistake, please email :email.',
                ['email' => config('meta.support_email')]));

    }
}
