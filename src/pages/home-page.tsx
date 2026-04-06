import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { ChevronRightIcon, DotIcon, MoveRightIcon, PlusIcon, UsersIcon } from 'lucide-react'
import AppHeader from '@/components/app-header'

function HomePage({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader />
            <main className='flex min-h-0 flex-1 flex-col'>
                <div className='mx-auto flex w-full max-w-[80rem] min-w-0 flex-col flex-1 gap-6 px-4 py-6 md:px-0 lg:py-8'>
                    <div className='flex flex-1 justify-between md:justify-start md:gap-6'>
                        <Button>
                            <PlusIcon />
                            Create a campaign
                        </Button>
                        <Button>
                            <MoveRightIcon />
                            Join a campaign
                        </Button>
                    </div>
                    <div>
                        <h5 className='font-semibold'>Your Campaigns</h5>
                    </div>
                    <div className='flex w-full max-w flex-col gap-6'>
                        <Item variant="outline" asChild>
                            <a href="#">
                                <ItemContent>
                                    <ItemTitle>Vale of Thorns</ItemTitle>
                                    <ItemDescription>
                                        <span className='flex items-center'>
                                            <Badge variant="outline">Dungeon Master</Badge>
                                            <DotIcon />
                                            <span className='text-xs'>
                                                Session 7 is live
                                            </span>
                                        </span>
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <div className='flex items-center'>
                                        <UsersIcon className='size-3 me-1' />
                                        <span className='text-xs'>
                                            3
                                        </span>
                                    </div>
                                    <span className='text-xs'>
                                        Active today
                                    </span>
                                    <ChevronRightIcon className="size-4" />
                                </ItemActions>
                            </a>
                        </Item>
                        <Item variant="outline" asChild>
                            <a href="#">
                                <ItemContent>
                                    <ItemTitle>The Shattered Crown</ItemTitle>
                                    <ItemDescription>
                                        <span className='flex items-center'>
                                            <Badge variant="outline">Player</Badge>
                                            <DotIcon />
                                            <span className='text-xs'>
                                                Session 12 &middot; Ended
                                            </span>
                                        </span>
                                    </ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <div className='flex items-center'>
                                        <UsersIcon className='size-3 me-1' />
                                        <span className='text-xs'>
                                            4
                                        </span>
                                    </div>
                                    <span className='text-xs'>
                                        2 days ago
                                    </span>
                                    <ChevronRightIcon className="size-4" />
                                </ItemActions>
                            </a>
                        </Item>
                    </div>
                </div>
            </main>
        </>
    )
}

export default HomePage
